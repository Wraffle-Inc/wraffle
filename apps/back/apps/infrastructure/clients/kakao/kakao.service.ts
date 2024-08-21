import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import * as jwks from 'jwks-rsa';
import * as qs from 'qs';

import { TokenResponse, UserInfo } from './types';

@Injectable()
export class KakaoService {
  static JWKS_URI = 'https://kauth.kakao.com/.well-known/jwks.json';
  static TOKEN_ISSUER = 'https://kauth.kakao.com';
  static AUTH_HOST = 'https://kauth.kakao.com';
  static API_HOST = 'https://kapi.kakao.com';
  private readonly restClientId: string;
  private readonly appClientId: string;

  constructor(private readonly configService: ConfigService) {
    this.restClientId = configService.get('KAKAO_REST_CLIENT_ID');
    this.appClientId = configService.get('KAKAO_APP_CLIENT_ID');
  }

  // https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-token
  async getToken(
    authorizationCode: string,
    redirectUri: string,
  ): Promise<TokenResponse> {
    const reqData = {
      grant_type: 'authorization_code',
      client_id: this.restClientId,
      redirect_uri: redirectUri,
      code: authorizationCode,
    };

    const response = await axios.post(
      `${KakaoService.AUTH_HOST}/oauth/token`,
      qs.stringify(reqData),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );

    return TokenResponse.fromRawData(response.data);
  }

  // https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#oidc-user-info
  async getUserInfo(accessToken: string): Promise<UserInfo> {
    const response = await axios.get(
      `${KakaoService.API_HOST}/v1/oidc/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return UserInfo.fromRawData(response.data);
  }

  // https://developers.kakao.com/docs/latest/ko/kakaologin/common#oidc-id-token-verify
  async verifyIdToken(idToken: string): Promise<jwt.JwtPayload> {
    const client = jwks({
      jwksUri: KakaoService.JWKS_URI,
      cache: true,
      rateLimit: true,
    });

    return new Promise((resolve, reject) => {
      jwt.verify(
        idToken,
        (header, callback) => {
          client.getSigningKey(header.kid, (err, key) => {
            if (err) {
              return reject(err.message);
            }

            const signingKey = key.getPublicKey();
            callback(null, signingKey);
          });
        },
        {
          algorithms: ['RS256'],
          issuer: KakaoService.TOKEN_ISSUER,
          audience: [this.restClientId, this.appClientId].filter(Boolean),
        },
        (err, decoded) => {
          if (err) {
            return reject(err.message);
          }

          resolve(decoded as jwt.JwtPayload);
        },
      );
    });
  }
}
