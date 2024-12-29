export interface JoinRequest {
  name: string;
  email: string;
  password: string;
  nickname: string;
  phoneNumber: string;
  isAgreed: boolean;
  isPrivacyAgreed: boolean;
  isThirdAgreed: boolean;
  isMarketingAgreed: boolean;
}
