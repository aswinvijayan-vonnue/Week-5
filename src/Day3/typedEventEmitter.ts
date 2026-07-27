interface User {
  id: string;
  name: string;
  email: string;
}

type UserEvents = {
  userAdded: [User];
  userRemoved: [string];
  userUpdated: [string, Partial<User>];
};

class TypedEventEmitter<Events extends Record<string, any[]>> {
  events: Record<keyof Events, Array<(...args: Events[keyof Events]) => void>>;
  constructor() {
    this.events = {} as Events;
  }
  on<K extends keyof Events>(event: K, listener: (...args: Events[K]) => void): this {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener as (...args: Events[keyof Events]) => void);
    return this;
  }
  emit<K extends keyof Events>(event: K, ...args: Events[K]): boolean {
    const eventListeners = this.events[event];
    if (!eventListeners || eventListeners.length == 0) return false;
    eventListeners.forEach((listener) => listener(...args));
    return true;
  }
}
class UserStore extends TypedEventEmitter<UserEvents> {
  users: Array<User>;
  constructor() {
    super();
    this.users = [];
  }
  getUsers(): User[] {
    return this.users;
  }
  addUser(user: User): void {
    this.users.push(user);
    this.emit('userAdded', user);
  }
  removeUser(id: string) {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      console.log('User not found!');
      return;
    }
    this.users = this.users.filter((u) => u.id !== id);
    this.emit('userRemoved', id);
  }
  updateUser(id: string, changes: Partial<User>) {
    this.users = this.users.map((u) => {
      if (u.id === id) {
        return { ...u, ...changes };
      } else {
        return u;
      }
    });
    this.emit('userUpdated', id, changes);
  }
}

const obj = new UserStore();
const sample1: User = {
  id: '22b282',
  name: 'Akshay',
  email: 'akshay@gmail.com',
};
const sample2: User = {
  id: '22b283',
  name: 'Rohan',
  email: 'al',
};
const sample3: User = {
  id: '22b284',
  name: 'Priya',
  email: 'amal',
};
const sample4: User = {
  id: '22b285',
  name: 'Sona',
  email: 'amal',
};

obj.on('userAdded', () => console.log('Added successfully'));
const res = obj.on('userAdded', (sample1: User) => console.log(sample1, 'Added in the database'));
obj.on('userRemoved', (id: string) => console.log(`User with id ${id} deleted successfully`));
obj.on('userUpdated', (id) => console.log(`User with id ${id} updated successfully`));
obj.addUser(sample1);
obj.addUser(sample2);
obj.removeUser('22b283');
obj.addUser(sample4);
console.log(obj.getUsers());
obj.updateUser('22b285', { email: 'sonam@gmail.com' });
console.log(obj.getUsers());
// console.log(res);
