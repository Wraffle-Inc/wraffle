import {getSession} from '../util/auth/server';
import {type ApiResponseError, type ApiResponseWithData} from './type';

type FetchOptions<TBody = unknown> = Omit<RequestInit, 'headers' | 'body'> & {
  headers?: Record<string, string>;
  body?: TBody;
  withAuth?: boolean;
  contentType?: string;
};

export class FetchClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /*
  request 메소드 오버로드 정의
  TResponse를 지정하는 경우 리턴 타입은 Promise<ApiResponseWithData<TResponse>>
  TResponse를 지정하지 않는 경우 리턴 타입은 Promise<ApiResponseWithData<undefined> | null>
  */
  private async request<TResponse, TBody = unknown>(
    url: string,
    options: FetchOptions<TBody>,
  ): Promise<ApiResponseWithData<TResponse>>;
  private async request<TBody = unknown>(
    url: string,
    options: FetchOptions<TBody>,
  ): Promise<ApiResponseWithData<undefined> | null>;

  private async request<TResponse = undefined, TBody = unknown>(
    url: string,
    options: FetchOptions<TBody>,
  ): Promise<ApiResponseWithData<TResponse> | null> {
    const {
      withAuth = false,
      contentType = 'application/json',
      headers,
      body,
      ...restOptions
    } = options;

    const session = withAuth ? await getSession() : null;

    const allHeaders = new Headers(
      Object.assign(
        {
          'Content-Type': contentType,
        },
        withAuth && session
          ? {
              Authorization: `Bearer ${session.accessToken}`,
            }
          : {},
        headers,
      ),
    );

    const response = await fetch(`${this.baseUrl}${url}`, {
      ...restOptions,
      headers: allHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (response.status === 204) {
      return null;
    }

    const responseData = await response.json();

    if (!response.ok) {
      throw responseData as ApiResponseError;
    }

    return responseData as ApiResponseWithData<TResponse>;
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
