interface User {
  id: number;
  name: string;
}
const user1: User = {
  //showing age is missing that is both User interfaces are merged
  id: 30,
  name: 'amal',
  age: 45,
};

interface User {
  age: number;
  name: string;
}

interface Array<T> {
  sum(this: Array<number>): number;
}

Array.prototype.sum = function (this: Array<number>): number {
  const val = this.reduce((acc, current) => acc + current, 0);
  return val;
};

const nums: number[] = [3, 5, 6];
console.log(nums.sum());

interface UserDetail {
  id: string;
  isLoggedIn: boolean;
}
interface Window {
  appState: {
    userInfo: UserDetail;
    theme: 'Dark' | 'Light';
  };
}
