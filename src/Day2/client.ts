import { fetchJSON } from '../Day1/Utils/fetchJSON.ts';

interface ApiClient {
  baseUrl: string;
  get<T>(path: string): Promise<T>;
  post<T, B>(path: string, body: B): Promise<T>;
  put<T, B>(path: string, body: B): Promise<T>;
  delete<T>(path: string): Promise<T>;
}
class MockApiClient implements ApiClient {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  async requestResponseInterceptor<T>(url: string, option: T): Promise<T> {
    const options = { ...option, headers: { 'Content-Type': 'application/json' } };
    const completeUrl = `${this.baseUrl}/${url}`;
    console.log(completeUrl);
    const response = await fetchJSON(completeUrl, options);
    console.log(response);
    return response as T;
  }

  async get<T>(url: string): Promise<T> {
    const res = await this.requestResponseInterceptor(url, { method: 'GET' });
    return res as T;
  }

  async delete<T>(url: string): Promise<T> {
    const res = await this.requestResponseInterceptor(url, { method: 'DELETE' });
    return res as T;
  }

  async post<T, B>(url: string, body: B): Promise<T> {
    const res = await this.requestResponseInterceptor(url, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    return res as T;
  }

  async put<T, B>(url: string, body: B): Promise<T> {
    const res = await this.requestResponseInterceptor(url, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
    return res as T;
  }
}

const apiObj = new MockApiClient('https://jsonplaceholder.typicode.com');
apiObj.get('posts');

const body = {
  userId: 20,
  id: 100,
  title: 'testing card',
  body: 'testing body',
};
apiObj.post('posts', body);

const putBody = {
  userId: 1,
  id: 6,
  title: 'Put operation heading',
};
apiObj.put(`posts/${putBody.id}`, putBody);
apiObj.delete(`posts/${putBody.id}`);
