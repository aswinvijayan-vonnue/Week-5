function memoize<T extends unknown[],R>(fn:(...args:T)=>R) {
  let map = new Map<string,R>();
  return (...args:T):R => {
    let key = args.join(",");
    if (!map.has(key)) {
      let value = fn(...args);
      map.set(key, value);
      return value;
    } else {
      return map.get(key)!;
    }
  };
}
function fib(number:number):number {
  let num:number = number;
  if (num == 0 || num == 1) {
    return num;
  } else {
    let val1:number = fib(num - 1);
    let val2:number = fib(num - 2);
    return val1 + val2;
  }
}
const obj1 = memoize(fib);
console.time("firstcall");
console.log(`10th term of fibonacci is ${obj1(10)}`);
console.timeEnd("firstcall");
const obj2 = memoize(fib);
console.time("secondcall");
console.log(`10th term of fibonacci is ${obj1(10)}`);
console.timeEnd("secondcall");