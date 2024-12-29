export interface RequestCodeRequest {
  phoneNumber: string;
}

export interface VerifyCodeRequest {
  phoneNumber: string;
  code: string;
}
