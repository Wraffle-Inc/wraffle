import {auth} from './auth';

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const session = await auth();

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${session?.accessToken}`,
  };

  return fetch(url, {
    ...options,
    headers,
  });
}
