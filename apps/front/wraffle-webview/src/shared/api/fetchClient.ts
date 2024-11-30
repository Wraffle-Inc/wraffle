import {auth} from '../util/auth';
import type {ApiResponseError, ApiResponseWithData} from './type';

type FetchOptions<TBody = unknown> = Omit<RequestInit, 'headers' | 'body'> & {
  headers?: Record<string, string>;
  body?: TBody;
  withAuth?: boolean;
};

export class FetchClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<TResponse, TBody = unknown>(
    url: string,
    options: FetchOptions<TBody>,
  ): Promise<ApiResponseWithData<TResponse> | ApiResponseError> {
    const {withAuth = false, headers, body, ...restOptions} = options;
    const session = await auth();

    const allHeaders = new Headers(
      Object.assign(
        {
          'Content-Type': 'application/json',
        },
        withAuth ? {Authorization: `Bearer ${session?.accessToken}`} : {},
        headers,
      ),
    );

    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        ...restOptions,
        headers: allHeaders,
        body: body ? JSON.stringify(body) : undefined,
      });

      const responseData = await response.json();

      if (response.ok) {
        return responseData as ApiResponseWithData<TResponse>;
      } else {
        return responseData as ApiResponseError;
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Network error: ${error.message}`);
      }
      throw new Error('Unexpected error');
    }
  }

  public get<TResponse>(url: string, options?: FetchOptions) {
    return this.request<TResponse>(url, {method: 'GET', ...options});
  }

  public post<TResponse, TBody>(url: string, options?: FetchOptions<TBody>) {
    return this.request<TResponse>(url, {method: 'POST', ...options});
  }

  public put<TResponse, TBody>(url: string, options?: FetchOptions<TBody>) {
    return this.request<TResponse>(url, {method: 'PUT', ...options});
  }

  public patch<TResponse, TBody>(url: string, options?: FetchOptions<TBody>) {
    return this.request<TResponse>(url, {method: 'PATCH', ...options});
  }

  public delete<TResponse>(url: string, options?: FetchOptions) {
    return this.request<TResponse>(url, {method: 'DELETE', ...options});
  }
}
