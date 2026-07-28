function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const orgMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling method ${propertyKey} with args: ${args}`);
    const res = orgMethod.apply(this, args);
    console.log(`Method ${propertyKey} returned `, res);
    return res;
  };
  return descriptor;
}

@sealed
class User {
  private email: string;
  constructor(
    private id: number,
    private name: string
  ) {
    this.email = '';
  }

  @log
  getUser() {
    return { id: this.id, name: this.name };
  }
  @log
  addEmail(email: string) {
    this.email = email;
    return { id: this.id, name: this.name, email: this.email };
  }
}

const user1 = new User(20, 'Priya');
console.log(user1.getUser());
console.log(Object.isSealed(User));
console.log(Object.isSealed(User.prototype));
user1.addEmail('priya@gmail.com');
