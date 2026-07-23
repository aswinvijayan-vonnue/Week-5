interface User {
  id: number;
  name: string;
  email: string;
}

const userObj: object = {
  id: 'number',
  name: 'string',
  email: 'string',
};

type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rect'; w: number; h: number }
  | { kind: 'square'; side: number };

function processInput(value: string | number | boolean | null | undefined): void {
  if (value == null) {
    console.log('value is missing');
    return;
  }
  if (value === true) {
    console.log('value is of type boolean and value is true');
    return;
  }
  if (typeof value === 'string') {
    console.log(`${value} is a variable of type string`);
  } else if (typeof value === 'number') {
    value++;
    console.log(`value is number and updated to ${value}`);
  } else if (typeof value === 'boolean') {
    console.log(`boolean type : ${value}`);
  }
}

let undefinedVar: undefined = undefined;
let booleantrue: boolean = true;
let Fname: string = 'Rahan';
let age: number = 30;

processInput(undefinedVar);
processInput(booleantrue);
processInput(Fname);
processInput(age);
processInput(null);

function isUser(value: unknown): boolean {
  if (value == null || typeof value !== 'object') return false;
  let duplicate: object = structuredClone(value);
  for (const [key, value] of Object.entries(userObj)) {
    let val = (duplicate as Record<string, unknown>)[key];
    if (!val || typeof val !== value) return false;
    delete (duplicate as Record<string, unknown>)[key];
  }
  if (Object.keys(duplicate).length > 0) return false;

  return true;
}
let val: object = {
  id: 300,
  name: 'akshay',
  email: 'email',
  ph: 9090,
};
console.log(isUser(val));

function getArea(newShape: Shape): number {
  let area: number = 0;
  switch (newShape.kind) {
    case 'circle':
      area = Math.PI * newShape.radius ** 2;
      break;
    case 'rect':
      area = newShape.w * newShape.h;
      break;
    case 'square':
      area = newShape.side ** 2;
      break;
    default:
      const _exhaustiveCheck: never = newShape; //Type '{ kind: "square"; side: number; }' is not assignable to type 'never'.
      return _exhaustiveCheck;
  }
  return Number(area.toFixed(2));
}

let kind1: Shape = { kind: 'circle', radius: 7 };
let kind2: Shape = { kind: 'rect', w: 7, h: 50 };
console.log('Area of circle with radius 7  is:', getArea(kind1));
