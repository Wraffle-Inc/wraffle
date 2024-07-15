import { plainToInstance } from 'class-transformer';

export class ImpTokenResponse {
  code?: number;
  message?: string;
  response?: ImpAccessToken;

  static fromRawData(data: any): ImpTokenResponse {
    return plainToInstance(ImpTokenResponse, {
      code: data['code'],
      message: data['message'],
      ...(data['response'] && {
        response: ImpAccessToken.fromRawData(data['response']),
      }),
    });
  }
}

// Ref: https://docs.iamport.kr/tech/access-token
export class ImpAccessToken {
  accessToken: string;
  now: Date;
  expiredAt: Date;

  static fromRawData(data: any): ImpAccessToken {
    return plainToInstance(ImpAccessToken, {
      accessToken: data['access_token'],
      now: new Date(data['now'] * 1000),
      expiredAt: new Date(data['expired_at'] * 1000),
    });
  }
}

// Ref: https://api.iamport.kr/#/
export class ImpPaymentResponse {
  code?: number;
  message?: string;
  response?: ImpPayment;

  static fromRawData(data: any): ImpPaymentResponse {
    return plainToInstance(ImpPaymentResponse, {
      code: data['code'],
      message: data['message'],
      ...(data['response'] && {
        response: ImpPayment.fromRawData(data['response']),
      }),
    });
  }
}

export class ImpPayment {
  buyerEmail?: string;
  buyerName?: string;
  buyerTel?: string;
  impUid?: string;
  merchantUid?: string;
  status?: 'ready' | 'paid' | 'cancelled' | 'failed';
  name?: string;
  amount?: number;
  startedAt?: Date;
  receiptUrl?: string;
  isCacheReceiptIssued?: boolean;
  currency?: string;
  channel?: string;
  pgProvider?: string;
  pgTid?: string;
  pgId?: string;
  escrow?: boolean;
  applyNum?: string;
  bankCode?: string;
  bankName?: string;
  cardCode?: string;
  cardName?: string;
  cardQuota?: number;
  cardNumber?: string;
  cardType?: number;
  vbankCode?: string;
  vbankName?: string;
  vbankNum?: string;
  vbankHolder?: string;
  vbankDate?: Date;
  vbankIssuedAt?: Date;
  paidAt?: Date;
  cancelAmount?: number;
  cancelledAt?: Date;
  cancelReason?: string;
  failedAt?: Date;
  failReason?: string;

  static fromRawData(data: any): ImpAccessToken {
    return plainToInstance(ImpAccessToken, {
      buyerEmail: data['buyer_email'],
      buyerName: data['buyer_name'],
      buyerTel: data['buyer_tel'],
      impUid: data['imp_uid'],
      merchantUid: data['merchant_uid'],
      status: data['status'],
      name: data['name'],
      amount: data['amount'],
      staretdAt: data['started_at']
        ? new Date(data['started_at'] * 1000)
        : null,
      receiptUrl: data['receipt_url'],
      isCacheReceiptIssued: data['cash_receipt_issued'],
      currency: data['currency'],
      channel: data['channel'],
      pgProvider: data['pg_provider'],
      pgTid: data['pg_tid'],
      pgId: data['pg_id'],
      escrow: data['escrow'],
      applyNum: data['apply_num'],
      bankCode: data['bank_code'],
      bankName: data['bank_name'],
      cardCode: data['card_code'],
      cardName: data['card_name'],
      cardQuota: data['card_quota'],
      cardNumber: data['card_number'],
      cardType: data['card_type'],
      vbankCode: data['vbank_code'],
      vbankName: data['vbank_name'],
      vbankNum: data['vbank_num'],
      vbankHolder: data['vbank_holder'],
      vbankDate: data['vbank_date']
        ? new Date(data['vbank_date'] * 1000)
        : null,
      vbankIssuedAt: data['vbank_issued_at']
        ? new Date(data['vbank_issued_at'] * 1000)
        : null,
      paidAt: data['paid_at'] ? new Date(data['paid_at'] * 1000) : null,
      cancelAmount: data['cancel_amount'],
      cancelledAt: data['cancelled_at']
        ? new Date(data['cancelled_at'] * 1000)
        : null,
      cancelReason: data['cancel_reason'],
      failedAt: data['failed_at'] ? new Date(data['failed_at'] * 1000) : null,
      failReason: data['fail_reason'],
    });
  }
}
