import { plainToInstance } from 'class-transformer';

// Ref: https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api
export class TokenResponse {
  tokenType: string;
  accessToken: string;
  idToken: string;
  expiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
  scope?: string;

  static fromRawData(data: any): TokenResponse {
    return plainToInstance(TokenResponse, {
      tokenType: data['token_type'],
      accessToken: data['access_token'],
      idToken: data['id_token'],
      expiresIn: data['expires_in'],
      refreshToken: data['refresh_token'],
      refreshTokenExpiresIn: data['refresh_token_expires_in'],
      scope: data['scope'],
    });
  }
}

// Ref: https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#oidc-user-info
export class UserInfo {
  sub: string;
  name?: string;
  nickname?: string;
  picture?: string;
  email?: string;
  emailVerified?: boolean;
  gender?: string;
  birthdate?: string;
  phoneNumber?: string;
  phoneNumberVerified?: boolean;

  static fromRawData(data: any): UserInfo {
    return plainToInstance(UserInfo, {
      sub: data['sub'],
      name: data['name'],
      nickname: data['nickname'],
      picture: data['picture'],
      email: data['email'],
      emailVerified: data['email_verified'],
      gender: data['gender'],
      birthdate: data['birthdate'],
      phoneNumber: data['phone_number'],
      phoneNumberVerified: data['phone_number_verified'],
    });
  }
}
