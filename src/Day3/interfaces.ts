interface Serializable {
  toJSON(): string;
  fromJSON(data: string): this;
}

interface Printable {
  print(): void;
  getDisplayName(): string;
}

interface ValidationResult {
  isValid: boolean;
  errors?: string[];
}

interface Validatable {
  validate(): ValidationResult;
}

class customDocument implements Serializable, Printable, Validatable {
  constructor(
    public id: number,
    public title: string,
    public content: string
  ) {}
  toJSON(): string {
    return JSON.stringify({
      id: this.id,
      title: this.title,
      content: this.content,
    });
  }
  fromJSON(data: string): this {
    const parsedData = JSON.parse(data);
    ((this.id = parsedData.id),
      (this.title = parsedData.title),
      (this.content = parsedData.content));

    return this;
  }
  print(): void {
    console.log(`Id: ${this.id}`);
    console.log(`Title: ${this.title}`);
    console.log(`Content: ${this.content}`);
  }
  getDisplayName(): string {
    return this.title;
  }
  validate(): ValidationResult {
    let errors: string[] = [];
    let res: ValidationResult = {
      isValid: false,
      errors: [],
    };
    if (!this.id || this.id < 0) {
      errors.push('Invalid Id');
    }
    if (!this.title.trim()) {
      errors.push('Document title is missing');
    }
    if (!this.content.trim()) {
      errors.push('Document content is missing');
    }
    if (errors.length == 0) res.isValid = true;
    res.errors = errors;
    return res;
  }
}

const obj1 = new customDocument(100, 'Title 1', '');
const stri = obj1.toJSON();
const res = obj1.fromJSON(stri);
console.log(res);

const result = obj1.validate();
console.log(result);

const plainObject = {
  id: 200,
  title: 'Plain title',
  content: 'plain content',

  toJSON(): string {
    return JSON.stringify({
      id: this.id,
      title: this.title,
      content: this.content,
    });
  },
  fromJSON(data: string) {
    const parsedData = JSON.parse(data);
    ((this.id = parsedData.id),
      (this.title = parsedData.title),
      (this.content = parsedData.content));

    return this;
  },
};

const newInstance: Serializable = plainObject; //newInstance is a object of the type Interface serialzibale
