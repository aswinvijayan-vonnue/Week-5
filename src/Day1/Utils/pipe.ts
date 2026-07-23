const double = (num: number): number => num * 2;
const addOne = (num: number): number => num + 1;
const triple = (num: number): number => num * 3;
const increment = (num: number): number => num + 1;
const decrement = (num: number): number => num - 1;

const pipe =
  <Input, R>(...fns: ((arg: Input | R) => R)[]) =>
  (arg: Input) =>
    fns.reduce((acc: Input | R, fn) => fn(acc), arg);
//piped function
const pipedFunction = pipe(double, addOne);
//left to right so return 11
console.log('piped function 1', pipedFunction(5));
//returns true
console.log(pipe(double, addOne)(5) === 11);
const pipedFunction2 = pipe(addOne, triple, increment);
console.log('piped function 2:', pipedFunction2(5));
const pipedFunction3 = pipe(triple, decrement, double);
console.log('piped function 3', pipedFunction3(5));
