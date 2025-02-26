export interface GetSettlementResultDto {
  status: 'requested' | 'completed';
  id: number;
  createdAt: string;
  bankName: string;
  bankAccount: string;
  settlementPrice: number;
  settlementAccumulatePrice: number;
  settlementFinishedAt: Date;
}

export interface CursorPaginationMetaData {
  itemsPerPage: number;
  hasNextData: boolean;
  cursor: string;
}

export interface GetSettlementResultResponse {
  items: GetSettlementResultDto[];
  pagination: CursorPaginationMetaData;
}

export interface GetUserInfoResponse {
  id: number;
  createdAt: string;
  email: string;
  nickname: string;
  phoneNumber: string;
  isAgreed: boolean;
  isPrivacyAgreed: boolean;
  isThirdAgreed: boolean;
  isMarketingAgreed: boolean;
  settlementBankName?: string;
  settlementBankAccount?: string;
  availableSettlementPrice: number;
}
