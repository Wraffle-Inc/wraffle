import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RuntimeException } from "apps/infrastructure/error";
import { ApplicationLogger } from "apps/infrastructure/logger/application.logger";
import axios from "axios";

import {
  AlimtalkRecipient,
  AlimtalkResponse,
  EmailResponse,
  SmsResponse,
  UploadFileResponse,
} from "./types";

@Injectable()
export class NhnCloudService {
  // SMS
  private SMS_HOST = "https://api-sms.cloud.toast.com";
  private readonly SMS_SEND_NO: string;
  private readonly SMS_APP_KEY: string;
  private readonly SMS_SECRET_KEY: string;

  // EMAIL
  private EMAIL_HOST = "https://api-mail.cloud.toast.com";
  private readonly EMAIL_APP_KEY: string;
  private readonly EMAIL_SECRET_KEY: string;

  // Alimtalk
  private ALIMTALK_HOST = "https://api-alimtalk.cloud.toast.com";
  private readonly ALIMTALK_SENDER_KEY: string;
  private readonly ALIMTALK_APP_KEY: string;
  private readonly ALIMTALK_SECRET_KEY: string;

  constructor(
    private readonly logger: ApplicationLogger,
    private readonly configService: ConfigService,
  ) {
    this.SMS_SEND_NO = configService.get("NHN_CLOUD_SMS_SEND_NO");
    this.SMS_APP_KEY = configService.get("NHN_CLOUD_SMS_APP_KEY");
    this.SMS_SECRET_KEY = configService.get("NHN_CLOUD_SMS_SECRET_KEY");
    this.EMAIL_APP_KEY = configService.get("NHN_CLOUD_EMAIL_APP_KEY");
    this.EMAIL_SECRET_KEY = configService.get("NHN_CLOUD_EMAIL_SECRET_KEY");
    this.ALIMTALK_SENDER_KEY = configService.get(
      "NHN_CLOUD_ALIMTALK_SENDER_KEY",
    );
    this.ALIMTALK_APP_KEY = configService.get("NHN_CLOUD_ALIMTALK_APP_KEY");
    this.ALIMTALK_SECRET_KEY = configService.get(
      "NHN_CLOUD_ALIMTALK_SECRET_KEY",
    );
  }

  async sendSms(phoneNumber: string, body: string): Promise<SmsResponse> {
    const path = `/sms/v3.0/appKeys/${this.SMS_APP_KEY}/sender/sms`;
    const url = this.SMS_HOST + path;

    const data = {
      body,
      sendNo: this.SMS_SEND_NO,
      recipientList: [
        {
          recipientNo: phoneNumber,
        },
      ],
    };

    try {
      const response = await axios.post<SmsResponse>(url, data, {
        headers: {
          "X-Secret-Key": this.SMS_SECRET_KEY,
        },
      });

      return response.data;
    } catch (err) {
      this.logger.error({ message: "SMS 발송 실패", err: err.message });
      throw new RuntimeException("SMS 발송 실패");
    }
  }

  async sendEmailByTemplate(
    templateId: string,
    templateParameter: { [key: string]: string },
    receiverEmails: string[],
    attachFileIds?: string[],
  ): Promise<EmailResponse> {
    const path = `/email/v2.0/appKeys/${this.EMAIL_APP_KEY}/sender/mail`;
    const url = this.EMAIL_HOST + path;

    const data = {
      templateId,
      templateParameter,
      attachFileIdList: attachFileIds,
      receiverList: receiverEmails.map((receiverEmail) => {
        return {
          receiveMailAddr: receiverEmail,
          // 수신자 타입 (MRT0 : 받는사람 , MRT1 : 참조, MRT2 : 숨은참조)
          receiveType: "MRT0",
        };
      }),
    };

    try {
      const response = await axios.post<EmailResponse>(url, data, {
        headers: {
          "X-Secret-Key": this.EMAIL_SECRET_KEY,
          "Content-Type": "application/json;charset=UTF-8",
        },
      });

      return response.data;
    } catch (err) {
      this.logger.error({ message: "이메일 발송 실패", err: err.message });
      throw new RuntimeException("이메일 발송 실패");
    }
  }

  async uploadAttachedFile(
    fileName: string,
    fileBody: any,
  ): Promise<UploadFileResponse> {
    const path = `/email/v2.0/appKeys/${this.EMAIL_APP_KEY}/attachfile/binaryUpload`;
    const url = this.EMAIL_HOST + path;

    const data = {
      fileName,
      fileBody,
    };

    try {
      const response = await axios.post<UploadFileResponse>(url, data, {
        headers: {
          "X-Secret-Key": this.EMAIL_SECRET_KEY,
          "Content-Type": "application/json;charset=UTF-8",
        },
      });

      return response.data;
    } catch (err) {
      this.logger.error({ message: "첨부파일 업로드 실패", err: err.message });
      throw new RuntimeException("첨부파일 업로드 실패");
    }
  }

  async sendAlimtalkByTemplate(
    templateCode: string,
    recipients: AlimtalkRecipient[],
  ): Promise<AlimtalkResponse> {
    const path = `/alimtalk/v2.2/appkeys/${this.ALIMTALK_APP_KEY}/messages`;
    const url = this.ALIMTALK_HOST + path;

    const data = {
      senderKey: this.ALIMTALK_SENDER_KEY,
      templateCode,
      recipientList: recipients.map(({ phoneNumber, params }) => {
        return {
          recipientNo: phoneNumber,
          templateParameter: params,
        };
      }),
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          "X-Secret-Key": this.ALIMTALK_SECRET_KEY,
          "Content-Type": "application/json;charset=UTF-8",
        },
      });

      return response.data as AlimtalkResponse;
    } catch (err) {
      this.logger.error({ message: "알림톡 발송 실패", err: err.message });
      throw new RuntimeException("알림톡 발송 실패");
    }
  }
}
