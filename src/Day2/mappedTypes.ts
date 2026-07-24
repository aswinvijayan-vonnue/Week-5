interface User {
  id: number;
  name: string;
  age: number;
}
interface Person {
  name: string;
  address: {
    houseName: string;
    houseNumber: number;
    city: string;
  };
}
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

const user1: MyReadonly<User> = {
  id: 200,
  name: 'amal',
  age: 40,
};
// user1.id=202; Cannot assign to 'id' because it is a read-only property.

type MyPartial<T> = {
  [K in keyof T]?: T[K];
};
function testPartial(data: MyPartial<User>) {
  console.log(data);
}
testPartial({ id: 300 });

type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> };

const newData: DeepPartial<Person> = { address: {} }; //no error
// const anotherData:MyPartial<Person>={address:{}}

const appConfig = {
  theme: 'dark',
  version: 1.3,
};
type configKey = keyof typeof appConfig;
type configtype = typeof appConfig;

function getProperty<K extends configKey>(key: K): configtype[K] {
  let data = appConfig[key];
  return data;
}
console.log(getProperty('version'));
