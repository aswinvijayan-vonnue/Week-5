type IsArray<T> = T extends any[] ? true : false;
type Flatten<T> = T extends Array<infer Item> ? Item : T;
type CustomAwaited<T> = T extends Promise<infer U> ? CustomAwaited<U> : T;

type CustomParameters<T> = T extends (...args: infer A) => any ? A : T;
type CustomReturnType<T> = T extends (...args: any) => infer R ? R : T;

type ElementArray = IsArray<string>; // return whether it is an array or not
type arrayElement = Flatten<number[]>; // returns the type of element inside the array

function myFun(...args: number[]) {
  return args.length;
}
type functionType = typeof myFun;

type ArgsType = CustomParameters<typeof myFun>; //number array
type TestReturnType = CustomReturnType<typeof myFun>; //number

const myPromise: Promise<string> = new Promise((resolve, reject) => {
  resolve('success');
});

type AwaitType = CustomAwaited<typeof myPromise>; //type is string
