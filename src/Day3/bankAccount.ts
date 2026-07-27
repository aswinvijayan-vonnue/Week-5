class BankAccount {
  #JSPrivate = 'Private in js file';
  private TSPrivate = 'Private in ts file';
  readonly accountNo: number;
  constructor(
    private balance: number,
    public owner: string
  ) {
    this.accountNo = Date.now();
  }
  getBalance() {
    return this.balance;
  }
  protected transfer(amount: number) {
    this.balance += amount;
  }
}

class SavingsAccount extends BankAccount {
  constructor(owner: string, balance: number) {
    super(balance, owner);
  }
  transaction(amount: number) {
    this.transfer(amount);
  }
  //TSPrivate checking only compile time but JSPrivate checking during both compile and run time
  //   showPrivates() {
  //     console.log('hello');
  //     console.log(this.#JSPrivate); //SyntaxError: Private field '#JSPrivate' must be declared in an enclosing class
  //     console.log(this.TSPrivate);
  //   }
}
const user1 = new SavingsAccount('Aromal', 500);
// user1.accountNo= cant assign account number
// user1.balance Property 'balance' is private and only accessible within class 'BankAccount'.
console.log(user1.getBalance());
user1.transaction(300);
console.log(user1.getBalance());
// user1.transfer Property 'transfer' is protected and only accessible within class 'BankAccount' and its subclasses.
// user1.showPrivates();
