import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RuntimeException } from 'apps/infrastructure/error';
import { ApplicationLogger } from 'apps/infrastructure/logger/application.logger';
import axios from 'axios';

import {
  ImpAccessToken,
  ImpPayment,
  ImpPaymentResponse,
  ImpTokenResponse,
} from './types';

@Injectable()
export class IamportService {
  private readonly API_HOST = 'https://api.iamport.kr';
  private readonly GET_TOKEN_PATH = '/users/getToken';
  private readonly GET_PAYMENT = (impUid: string) => `/payments/${impUid}`;

  private readonly apiKey: string;
  private readonly apiSecret: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: ApplicationLogger,
  ) {
    this.apiKey = configService.get('IAMPORT_API_KEY');
    this.apiSecret = configService.get('IAMPORT_API_SECRET');
  }

  async getToken(): Promise<ImpAccessToken> {
    try {
      const reqData = {
        imp_key: this.apiKey,
        imp_secret: this.apiSecret,
      };

      const response = await axios.post(
        `${this.API_HOST}${this.GET_TOKEN_PATH}`,
        reqData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.code !== 0) {
        this.logger.error(`아임포트 토큰획득 실패: ${response.data.message}`);
        throw new RuntimeException();
      }

      return ImpTokenResponse.fromRawData(response.data).response;
    } catch (err) {
      this.logger.error(`아임포트 토큰획득 실패: ${err.message}`);
      throw new RuntimeException();
    }
  }

  async getPayment(impUid: string): Promise<ImpPayment> {
    const accessToken = await this.getToken();

    try {
      const response = await axios.get(
        `${this.API_HOST}${this.GET_PAYMENT(impUid)}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken.accessToken}`,
          },
        },
      );

      if (response.data.code !== 0) {
        this.logger.error(
          `아임포트 결제내역 조회실패: ${response.data.message}`,
        );
        throw new RuntimeException();
      }

      return ImpPaymentResponse.fromRawData(response.data).response;
    } catch (err) {
      this.logger.error(`아임포트 결제내역 조회실패: ${err.message}`);
      throw new RuntimeException();
    }
  }
}
