interface User {
  id: string;
  name: string;
  email: string;
  gender?: string;
  createdAt?: Date;
  avatar?: string;
}
const users: Array<User> = [];

//=============update user=================//

async function userUpdate(id: string, changes: Partial<User>): Promise<User | undefined> {
  let currentIdx = users.findIndex((u) => u.id === id);
  if (currentIdx === -1) throw new Error('user not found');
  users[currentIdx] = { ...users[currentIdx], ...changes };
  let updated = users[currentIdx];
  return updated;
}

const user1: User = {
  id: '22b292',
  name: 'Rohith',
  email: 'rohit@gmail.com',
};
const user2: User = {
  id: '22b293',
  name: 'Priya',
  email: 'priya@gmail.com',
};
const user3: User = {
  id: '22b294',
  name: 'Sona',
  email: 'sona@gmail.com',
};
users.push(user1, user2, user3);
console.log(users);

userUpdate('22b294', { email: 'sonara@gmail.com' })
  .then((res) => console.log('successfully updated', res))
  .catch((err) => console.error('not found'));
userUpdate('22b293', { name: 'Soya' })
  .then((res) => console.log('successfully updated', res))
  .catch((err) => console.error('not found'));
userUpdate('22b297', { email: 'sonara@gmail.com' })
  .then((res) => console.log('successfully updated', res))
  .catch((err) => console.error('not found'));

//==============create required User========================//
function createRequiredUser(data: Required<User>) {
  users.push(data);
}
const user4 = {
  id: '22b294',
  name: 'Sona',
  email: 'sona@gmail.com',
  gender: 'F',
  createdAt: new Date(),
  avatar: 'sona.png',
};
const user5 = {
  id: '22b299',
  name: 'Aloka',
  email: 'aloka@gmail.com',
  gender: 'F',
  createdAt: new Date(),
  avatar: 'aloka.png',
};
createRequiredUser(user4);
// createRequiredUser(user2);Property 'gender' is missing in type '{ id: string; name: string; email: string; }' but required

//===============User Preview=====================//

function userPreview(data: User): Pick<User, 'id' | 'createdAt' | 'name' | 'avatar'> {
  return { id: data.id, name: data.name, createdAt: data.createdAt, avatar: data.avatar };
}

console.log(`preview of user 4 is `, userPreview(user4));
console.log(`preview of user 5 is `, userPreview(user5));

//============UserInput using Omit========================//

type inputUser = Omit<User, 'id' | 'avatar'>;
function createUser(data: inputUser) {
  const userDetail: User = {
    id: String(Date.now()),
    name: data.name,
    email: data.email,
    ...(data.gender && { gender: data.gender }),
    createdAt: new Date(),
  };
  console.log(userDetail);
  users.push(userDetail);
}

const newUser1 = {
  name: 'Priyesh',
  email: 'priyesh@gmail.com',
};
const newUser2 = {
  name: 'Laya',
  email: 'laya@gmail.com',
  gender: 'F',
};
createUser(newUser1);
createUser(newUser2);

//==========typed config======================//
type configKey = 'singleQuote' | 'sourceType' | 'build';

let configuration: Record<configKey, string>;

configuration = {
  singleQuote: 'true',
  sourceType: 'module',
  build: 'true',
};
