## Strict flags

### 1. strictFunctionTypes

When enabled, this flag causes functions parameters to be checked more correctly

```

type stringOrNumber = (arg: string | number) => void;
const functionType: stringOrNumber = (x: string) => {
  console.log('hello, ' + x.toUpperCase());
};

functionType(10);

```

Here,
"strictFunctionTypes":false: executes and crashes the program:

> 'TypeError: x.toUpperCase is not a function

"strictFunctionTypes":true: program didnt run shown error:

> Type '(x: string) => void' is not assignable to type 'stringOrNumber'.

### 2. strictNullChecks

When strictNullChecks is false, null and undefined are effectively ignored

```
function findUser(users,id){
    return users.find((u) => u.id == id);
}
const users = [
  { id: 100, name: 'Rohith' },
  { id: 102, name: 'Amal' },
];
const loggedIn = findUser(users,103);
console.log(loggedIn.name);

```

if "strictNullChecks": false:

> TypeError: Cannot read properties of undefined (reading 'name')

if "strictNullChecks": true

> 'loggedIn' is possibly 'undefined'.

### 3.noImplicitAny

In some cases where no type annotations are present, TypeScript will fall back to a type of 'any' for a variable when it cannot infer the type.

```
function greetUser(user) {
  console.log('hi ', user.name);
}
greetUser('hello');
```

if "noImplicitAny": false:
no variable type checking and simply assigns any so output : hi undefined

if "noImplicitAny": true it shows an error

> Parameter 'user' implicitly has an 'any' type

### 4.noUncheckedIndexedAccess

Along with noUncheckedIndexedAccess we also enable strictNullChecks to 'true'.

```
const smallLetters =[];
const CapitalLetter = smallLetters[0].toUpperCase();
console.log(CapitalLetter);
```

if "noUncheckedIndexedAccess":false:
code crashes

> TypeError: Cannot read properties of undefined

if "noUncheckedIndexedAccess":true:
code shows error

> Object is possibly 'undefined'
