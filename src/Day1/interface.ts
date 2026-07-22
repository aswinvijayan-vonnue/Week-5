interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'viewer' | 'editor';
  createdAt: Date;
  avatar?: string;
};

const user1: User = {
  id: 102,
  name: 'Shyam',
  email: 'abc@gmail.com',
  role: 'admin',
  createdAt: new Date(),
};
console.log('user with all correct details:', user1);
// interface User{
//     age:number;
// } if we can reopen same interface User and edit the property

const user2: User = {
  id: 105,
  name: 'Abin',
  email: 'abc@gmail.com',
  role: 'editor',
  createdAt: new Date('2025-10-10'),
  avatar: 'abc.png',
};
user2.role = 'admin';
console.log('user with all correct details:', user2);

// const user3:User={
//     id:102,
//     name:'Lowshik',
//     email:'abc@gmail.com',
//     role:'guest',
//     createdAt:new Date()
// }
// console.log('user with all correct details:',user3); cannot give role as guest there is only 3 options

// const user4:User={
//     id:106,
//     name:'Ambareesh',
//     email:'abc@gmail.com',
//     role:'editor',
//     createdAt:new Date('2025-10-10'),
//     avatar:'abc.png',
//     dept:'Cse'
// } dept is not in User type sp thrown error

function getUser(
  id: number,
  name: string,
  email: string,
  role: 'viewer' | 'editor' | 'admin',
  createdAt: Date,
  avatar?: string
): User {
  let data: User = { id, name, email, role, createdAt };
  data = avatar ? { ...data, avatar } : data;
  return data;
}
console.log(getUser(110, 'Riya', 'riya@gmail.com', 'editor', new Date()));
console.log(getUser(112, 'Nayana', 'nayanaa@gmail.com', 'editor', new Date(), 'avatar.png'));

//Readonly make object entirely readonly cant update
type ReadOnlyUser = Readonly<User>;
const reader1: ReadOnlyUser = {
  id: 210,
  name: 'Rahan',
  email: 'rhan@gmail.com',
  role: 'viewer',
  createdAt: new Date(),
};
// reader1.role='admin';show error cannot modify this
console.log('read only user data', reader1);

//======Partial<>=========make every keys optional
const updateUser=(user:User,changes:Partial<User>):User=>({...user,...changes});

let changes={
    email:'shyam@gmail.com',
    avatar:'shyam.png'
}

console.log('User before updating : ',user1);
console.log('User after updation :',updateUser(user1,changes));

// interface and type alias both almost similar changes is in the extension

interface Admin extends User{
    manager:string;
}
const admin1:Admin={
    id:210,
    name:'Rohith',
    email: 'rohith@gmail.com',
    role: 'admin',
    createdAt: new Date(),
    manager:'priyesh'
}
console.log('extended interface',admin1);

type Viewer= ReadOnlyUser & {
    isRegistered:boolean
}
const viewer1:Viewer={
    id:310,
    name:'Rocky',
    email: 'rocky@gmail.com',
    role: 'viewer',
    createdAt: new Date(),
    isRegistered:false,

}
console.log('Extended type alias: ',viewer1);