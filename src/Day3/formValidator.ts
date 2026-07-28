type Rule<T = unknown> = {
  required?: boolean;
  minLength?: number;
  pattern?: RegExp;
  custom?: (v: T) => string | null;
};

class FormValidator<T extends Record<string, unknown>> {
  private form: T;
  private rules: { [K in keyof T]?: Rule<T[K]> };
  private errors: Partial<Record<keyof T, string>>;
  constructor(form: T, rules: { [K in keyof T]?: Rule<T[K]> }) {
    this.form = form;
    this.rules = rules;
    this.errors = {};
  }
  validate(): { valid: boolean; errors: Partial<Record<keyof T, string>> } {
    let isValid: boolean = true;
    let key: keyof T;
    let rule: Rule<T[typeof key]>;
    for ([key, rule] of Object.entries(this.rules)) {
      let fieldError: string | null = null;
      // if (!errors[k]) errors[k] = [];
      // console.log(rule);
      if (!rule) continue;
      const value = this.form[key];
      // console.log(rule, `and value is:`, value);
      if (rule.required) {
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          console.log('error thrown required');
          fieldError = `${key as string} is required`;
          this.errors[key] = fieldError;
          isValid = false;
        }
      }
      const isEmpty: boolean = !value || (typeof value == 'string' && value.trim() === '');
      if (!rule.required && isEmpty) continue;
      if (rule.minLength && !fieldError) {
        if (typeof value === 'string') {
          if (value.length < rule.minLength) {
            // console.log('error thrown minlength');
            fieldError = `${key as string} must be atleast ${rule.minLength} characters `;
            this.errors[key] = fieldError;
            // errors[key].push(fieldError);
            isValid = false;
          }
        }
      }
      if (rule.pattern && !fieldError) {
        if (typeof value === 'string' && !rule.pattern.test(value)) {
          fieldError = `${key as string} incorrect format `;
          this.errors[key] = fieldError;

          isValid = false;
        }
      }
      if (rule.custom && !fieldError) {
        fieldError = rule.custom(value);
        if (fieldError) {
          this.errors[key] = fieldError;
          isValid = false;
        }
      }
    }
    return { valid: isValid, errors: this.errors };
  }
}

const formData = {
  username: 'amalj',
  email: 'amal@gmail.com',
  password: 'Amal@123',
  dob: new Date('2024-02-24'),
};

const ruleSet: Record<keyof typeof formData, Rule> = {
  username: {
    required: true,
    minLength: 12,
  },
  password: {
    required: true,
    minLength: 10,
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  dob: {
    required: true,
    custom: (v: unknown) => {
      if (v instanceof Date) {
        const today = new Date();
        const age = today.getFullYear() - v.getFullYear();
        // console.log('age  is ', age);
        if (age < 18) return 'User must be atleast 18 years old';
        return null;
      }
      return 'Validation Error';
    },
  },
};

const obj = new FormValidator(formData, ruleSet);
const res = obj.validate();
console.log('after validation: ', res);
