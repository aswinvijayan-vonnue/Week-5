type Observer<T> = (...args: T[]) => void;

type Unsubscribe = () => void;
type User = {
  id: number;
  name: string;
  email: string;
};
interface Observable<T> {
  subscribe(observer: Observer<T>): Unsubscribe;
}

class Subject<T> implements Observable<T> {
  observers: Set<Observer<T>>;
  constructor() {
    this.observers = new Set<Observer<T>>();
  }
  subscribe(observer: Observer<T>): Unsubscribe {
    this.observers.add(observer);

    return () => this.observers.delete(observer);
  }
  notify(payload: T) {
    for (const observer of this.observers) {
      observer(payload);
    }
  }
}

const users: Array<User> = [];

const userAdd = (user: User) => {
  console.log('User added', user);
};
const totalUsers = () => {
  console.log('total number of users is ', users.length);
};
const obj = new Subject<User>();
const unsubUserAdd = obj.subscribe(userAdd);
const unsubscribeTotal = obj.subscribe(totalUsers);
function userAdding(user: User) {
  users.push(user);
  obj.notify(user);
}

const user1: User = {
  id: 100,
  name: 'amal',
  email: 'amal@gmail.com',
};
userAdding(user1);
const user2: User = {
  id: 101,
  name: 'Rohan',
  email: 'rohan@gmail.com',
};
unsubscribeTotal(); //unsubscribed total users function
userAdding(user2);

interface Command {
  execute(arg: unknown): void;
  undo(arg: unknown): void;
}

class TextDoc {
  content: string;
  constructor(content: string = '') {
    this.content = content;
  }
}

class AppendText implements Command {
  private previous: string = '';
  constructor(private data: string) {}
  execute(doc: TextDoc): void {
    this.previous = doc.content;
    doc.content += this.data;
    console.log('Document state is ', doc.content);
  }
  undo(doc: TextDoc): void {
    doc.content = this.previous;
    console.log('Document state undone :', doc.content);
  }
}

class ClearText implements Command {
  private previous: string = '';
  constructor(private doc: TextDoc) {}
  execute(doc: TextDoc): void {
    this.previous = doc.content;
    this.doc.content = '';
    console.log('Document cleared :', doc.content);
  }
  undo(doc: TextDoc): void {
    this.doc.content = this.previous;
    console.log('document state undone ', doc.content);
  }
}

class CommandHistory {
  undoStack: Command[];
  redoStack: Command[];
  doc: TextDoc;
  constructor(doc: TextDoc) {
    this.doc = doc;
    this.undoStack = [];
    this.redoStack = [];
  }
  run(command: Command) {
    command.execute(doc);
    this.undoStack.push(command);
    this.redoStack = [];
  }
  undo() {
    const command = this.undoStack.pop();
    if (!command) return;
    command.undo(this.doc);
    this.redoStack.push(command);
  }
  redo() {
    const command = this.redoStack.pop();
    if (!command) return;
    command.execute(this.doc);
    this.undoStack.push(command);
  }
}

const doc = new TextDoc('hello');
const historyObj = new CommandHistory(doc);
historyObj.run(new AppendText('class'));
historyObj.run(new AppendText('anotherOne'));
historyObj.undo();
historyObj.redo();
historyObj.run(new ClearText(doc));
historyObj.undo();
