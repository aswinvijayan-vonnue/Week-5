interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Coupon {
  code: string;
  value: number;
  expiry: Date;
}

interface Cart {
  items: Array<CartItem>;
  isCoupon?: Coupon;
  couponApplied: boolean;
  total: number;
}

class Observer {
  observers: Array<(state: Cart) => void>;
  constructor() {
    this.observers = [];
  }
  addObserver(fn: (state: Cart) => void): void {
    this.observers.push(fn);
  }
  notifyAll(data: Cart): void {
    this.observers.forEach((fn) => {
      fn(data);
    });
  }
}
let listener: Observer = new Observer();

class CartModule {
  cart: Cart;
  constructor() {
    this.cart = {
      items: [],
      couponApplied: false,
      total: 0,
    };
  }
  addItem(item: CartItem): void {
    this.cart.items.push(item);
    this.cart.total += item.price;
    listener.notifyAll(this.cart);
  }
  removeItem(id: number): void {
    let deletedItem = this.cart.items.find((obj) => obj.id === id);
    this.cart.items = this.cart.items.filter((obj) => obj.id !== id);
    if (deletedItem) this.cart.total -= deletedItem.price ? deletedItem.price : 0;
    listener.notifyAll(this.cart);
  }
  addCoupon(coupon: Coupon): void {
    this.cart.isCoupon = coupon;
    listener.notifyAll(this.cart);
  }
  applyCoupon(code: string): void {
    if (this.cart.isCoupon && !this.cart.couponApplied) {
      if (this.cart.isCoupon.code === code && this.cart.isCoupon.expiry > new Date()) {
        let val: number = this.cart.isCoupon.value;
        let discount: number = 100 - val;
        this.cart.total = Number(((discount / 100) * this.cart.total).toFixed(2));
        this.cart.couponApplied = true;
      }
    }
    listener.notifyAll(this.cart);
  }
  getCart(): Cart {
    return this.cart;
  }
  getTotal(): number {
    return this.cart.total;
  }
}

const noti1: (data: Cart) => void = (data: Cart) => {
  console.log('After state change:', data);
};
const noti2: (data: Cart) => void = (data: Cart) =>
  console.log('Total items in cart: ', data.items.length);
listener.addObserver(noti1);
listener.addObserver(noti2);

const item1: CartItem = {
  id: 100,
  name: 'Sugar',
  price: 1000,
  quantity: 1,
};
const item2: CartItem = {
  id: 200,
  name: 'Milk',
  price: 100,
  quantity: 3,
};

let cart1 = new CartModule();
cart1.addItem(item1);
cart1.addItem(item2);
console.log('Total price is:', cart1.getTotal());
const coupon1 = {
  code: 'abc',
  value: 50,
  expiry: new Date('12-05-2027'),
};
cart1.addCoupon(coupon1);
cart1.applyCoupon('abc');
