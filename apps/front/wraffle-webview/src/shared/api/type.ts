export interface ApiResponse {
  status: number;
  code: string;
}

export type ApiResponseError = ApiResponse & {
  message: string;
};

export type ApiResponseWithData<T> = ApiResponse & {
  data: T;
};

export const isApiResponseError = (
  error: unknown,
): error is ApiResponseError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'code' in error &&
    'message' in error
  );
};

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
