// Ref: https://docs.toast.com/ko/Notification/SMS/ko/api-guide/
export interface SmsResponse {
  header: {
    // 성공 여부
    isSuccessful: boolean;
    // 실패 코드
    resultCode: number;
    // 실패 메시지
    resultMessage: string;
  };

  body: {
    data: {
      // 요청 ID
      requestId: string;
      // 요청 상태 코드(1:요청 중, 2:요청 완료, 3:요청 실패)
      statusCode: string;
      // 발신자 그룹키
      senderGroupingKey: string;
      sendResultList: {
        // 수신 번호
        recipientNo: string;
        // 결과 코드
        resultCode: number;
        // 결과 메시지
        resultMessage: string;
        // 수신자 시퀀스(mtPr)
        recipientSeq: number;
        // 수신자 그룹키
        recipientGroupingKey: string;
      }[];
    };
  };
}

// Ref: https://docs.toast.com/ko/Notification/Email/ko/api-guide/
export interface EmailResponse {
  header: {
    // 성공 여부
    isSuccessful: boolean;
    // 실패 코드
    resultCode: number;
    // 실패 메시지
    resultMessage: string;
  };

  body: {
    data: {
      requestId: string;
      results: {
        // 수신자 메일 주소
        receiveMailAddr: string;
        // 수신자 타입 (MRT0 : 받는사람 , MRT1 : 참조, MRT2 : 숨은참조)
        receiveType: string;
        // 수신자 발송 요청 결과 코드
        resultCode: number;
        // 수신자 발송 요청 결과 메시지
        resultMessage: string;
      }[];
    };
  };
}

export interface AlimtalkRecipient {
  phoneNumber: string;
  params: { [key: string]: string };
}

// Ref: https://docs.toast.com/ko/Notification/KakaoTalk%20Bizmessage/ko/alimtalk-api-guide
export interface AlimtalkResponse {
  header: {
    isSuccessful: boolean;
    resultCode: number;
    resultMessage: string;
  };

  message: {
    // 요청 아이디
    requestId: string;
    // 발신자 그룹핑키
    senderGroupingKey: string;
    sendResults: {
      // 수신자 시퀀스 번호
      recipientSeq: number;
      // 수신 번호
      recipientNo: string;
      // 발송요청 결과코드
      resultCode: number;
      // 발송요청 결과메시지
      resultMessage: string;
      // 수신자 그룹핑키
      recipientGroupingKey: string;
    }[];
  };
}

export interface UploadFileResponse {
  header: {
    isSuccessful: boolean;
    resultCode: number;
    resultMessage: string;
  };
  body: {
    data: {
      fileId: number;
      fileName: string;
    };
  };
}
