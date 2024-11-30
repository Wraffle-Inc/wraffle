export type ApiResponse = {
  status: number;
  code: string;
};

export type ApiResponseError = ApiResponse & {
  message: string;
};

export type ApiResponseWithData<T> = ApiResponse & {
  data: T;
};
