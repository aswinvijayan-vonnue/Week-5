interface User {
  id: number;
  name: string;
  email: string;
}
let users: Array<User> = [];
type ApiResponse<T> =
  { success: true; data: T } | { success: false; error: string; statusCode: number };
function handleResponse<T>(response: ApiResponse<T>) {
  if (response.success) {
    console.log('Successs', response.data);
  } else {
    console.log('error:', response.error);
  }
}
const user1: User = {
  id: 200,
  name: 'Rasha',
  email: 'rasha@gmail.com',
};
const user2: User = {
  id: 200,
  name: 'Priya',
  email: 'priya@gmail.com',
};
users.push(user1);
users.push(user2);
handleResponse({ success: true, data: user1 });
handleResponse({ success: false, error: 'error in fetching', statusCode: 400 });

type LoadingState<T> =
  'idle' | 'loading' | { status: 'success'; data: T } | { status: 'error'; error: Error };

function renderUser(curState: LoadingState<User[]>) {
  if (curState === 'idle') return `<span>get Users </span>`;
  if (curState === 'loading') return `<span>loading.... </span>`;
  if (curState.status === 'success') {
    let renderData = curState.data
      .map((data) => {
        return `<div>
                <div>Name: ${data.name}</div>
                <div>Email: ${data.email}</div>
            
            </div>`;
      })
      .join('');
    return renderData;
  }
  if (curState.status === 'error') `<span>failed to load data.... </span>`;
}
console.log(renderUser({ status: 'success', data: users }));
