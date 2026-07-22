let studentName: string = 'amal';
console.log(studentName);
// studentName=20; show type mismatch error

let age: number;
age = 30;
console.log(age);

let isFound: boolean = false;
isFound = true;
console.log(isFound);

let course: null;
// course=age; number is not assignable to typoe null

let CourseName: undefined;
// CourseName='dbms';

const key1: symbol = Symbol('class');
const key2: symbol = Symbol('class');
console.log(key1 == key2); //returns false each symbol is unique

let bigNum: bigint = BigInt(900000000000);
console.log(bigNum);

let data: any = 'hello';
data = 10;
//instead of any we can use union that is OR or can use unknown
console.log(data);

let weight: number | string = '10';
// weight=true;

// weight=bigNum; throw error

let userinput: unknown;
userinput = 25;
// age=userinput;cant assign

function crashCode(message: string): never {
  throw new Error(message);
}
let user: string = 'super';
if (user === '') crashCode('invalid user');

function greetings(name: string): void {
  console.log('hello ' + name);
}
greetings('Sasi');

type user = {
  id: number;
  name: string;
  dept?: string; //optional
};
const user1: user = {
  id: 103,
  name: 'akshay',
};
user1.name = 'Lolan';
user1.dept = 'CSE';
console.log(user1);

let scoreList: number[] = [];
scoreList.push(20);
// scoreList.push('amal')
console.log(scoreList);
let students: Array<string> = [];
students.push('Stud1');
// students.push(user1)
console.log(students);

type tuple = [number, string];
let stud1: tuple = [10, 'Rohan'];
// let stud2:tuple=['amal',40]

function add(num1: number, num2: number): number {
  return num1 + num2;
}
function multiple(num1: number, num2: number) {
  return num1 * num2;
}
console.log('calling add:10+40= ', add(10, 40));
console.log('calling multiple:10*40= ', multiple(10, 40));

function findCord(lat: number, longi: number): [number, number] {
  return [lat, longi];
}
console.log(`cordinates of batheri is:(${findCord(30, 50)})`);

const greeting1 = 'Hello'; //const greeting:'Hello'
console.log(typeof greeting1);

let greeting2 = 'hi'; //let greeting2:string
console.log(typeof greeting2);

function calculateTax(amt: number | string): number | undefined {
  if (typeof amt === 'string') {
    console.log('amt is string');
    let val: number = parseFloat(amt);
    return val * 2;
  } else if (typeof amt === 'number') {
    console.log('amount is number');
    return amt * 1.5;
  }
}

console.log('Passing amount as number: ',calculateTax(1000));
console.log('Passing amount as string: ',calculateTax('2000'));
