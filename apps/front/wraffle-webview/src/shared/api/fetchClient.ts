import {getSession} from '../util/auth/server';
import {type ApiResponseError, type ApiResponseWithData} from './type';

type Params<T = unknown> = {
  [K in keyof T]?: string | number | boolean | null | undefined;
};

type FetchOptions<TBody = unknown, TParams = unknown> = Omit<
  RequestInit,
  'headers' | 'body'
> & {
  headers?: Record<string, string>;
  body?: TBody;
  withAuth?: boolean;
  contentType?: string;
  params?: Params<TParams>;
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
      params,
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

    const fetchUrl = `${this.baseUrl}${url}${
      params &&
      '?' +
        new URLSearchParams(
          Object.entries(params)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([_, value]) => value != null)
            .map(([key, value]) => [key, String(value)]),
        ).toString()
    }`;

    const response = await fetch(fetchUrl, {
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
