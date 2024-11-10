export type JoinStep = {
  Info: {
    email?: string;
    password?: string;
  };
  Name: {
    email: string;
    password: string;
    name?: string;
    nickname?: string;
  };
  Phone: {
    email: string;
    password: string;
    name: string;
    nickname: string;
    phoneNumber?: string;
  };
  Extra: {
    email: string;
    password: string;
    name: string;
    nickname: string;
    phoneNumber: string;
    isAgreed?: boolean;
    isPrivacyAgreed?: boolean;
    isThirdAgreed?: boolean;
    isMarketingAgreed?: boolean;
  };
};
