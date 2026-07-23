export async function fetchJSON(url:URL|RequestInfo, options?:RequestInit):Promise<Response> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP eror! status: ${response.status}`);
    }
    return await response.json();
  } catch (err:unknown) {
    if(err instanceof Error){
      console.error(err.message);
    }
    throw err;
  }
}