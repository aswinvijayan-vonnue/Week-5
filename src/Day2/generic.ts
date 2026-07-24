function identify<T>(arg: T): T {
  console.log('identified', arg);
  return arg;
}
let test1 = 30;
let test2 = 'abc';
let test3 = {
  id: 23,
  name: 'amal',
};
const val1: number = identify(test1);
const val2: string = identify(test2);
const val3: object = identify(test3);

console.log(
  `Returned values from function first call ${val1}, second call ${val2} and third call`,
  val3
);

const first = <T>(arr: T[]): T => arr[0];

console.log(first([1, 2, 3, 4, 5]));
console.log(first(['a', 'b', 'c', 'd', 'e']));

const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) throw new Error('http error');
  const data: T = await response.json();
  return data;
};

fetchData('https://jsonplaceholder.typicode.com/todos/1').then((res) => console.log(res));

interface User {
  id: number;
  name: string;
  email: string;
}

const getProperty = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];

const user1: User = {
  id: 10,
  name: 'akshay',
  email: 'as@gmail.com',
};
const obj1 = {
  item: 'sugar',
  price: 300,
};
console.log('hello', getProperty(user1, 'name'));
// console.log('hello', getProperty(user1, 'age')); Argument of type '"age"' is not assignable to parameter of type 'keyof User'.
console.log('obj1 price: ', getProperty(obj1, 'price'));

class Queue<T> {
  items: T[];
  constructor() {
    this.items = [];
  }
  enqueue(item: T) {
    this.items.push(item);
  }
  deque(): T | undefined {
    const val = this.items.shift();
    return val;
  }
  peek(): T | undefined {
    return this.items[0];
  }
  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

const numQueue = new Queue<number>();
const stringQueue = new Queue<string>();
numQueue.enqueue(5);
numQueue.enqueue(10);
numQueue.enqueue(15);
numQueue.enqueue(20);
numQueue.enqueue(25);
console.log('At top: ', numQueue.peek());
console.log('isEmpty: ', numQueue.isEmpty());
console.log('removed ', numQueue.deque());
console.log('At top: ', numQueue.peek());
// stringQueue.enqueue(30) show error
console.log('string Queue isEmpty: ', stringQueue.isEmpty());
