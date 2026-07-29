import { findLength, addNumbers, maxVal } from '#test-library';
console.log(findLength([5, 8, 12, 50]));
console.log(addNumbers(300, 150));
console.log(`Maximum value is ${maxVal}`);

const palette = {
  primary: '#0D9488',
} satisfies Record<string, string>; //if instead of string when we give number shows error
//Its better to use instead of type annotation when we just want to check if expression is of type but we dont want to change the type of resulting expressions
