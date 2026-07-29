// import {  } from '#test-library'; commented because of testlibrary is in another branch
declare module '#test-library' {
  interface User {
    greeting(name: string): void;
  }
}
