import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import * as jwks from 'jwks-rsa';

@Injectable()
export class AppleService {
  static JWKS_URI = 'https://appleid.apple.com/auth/keys';
  static TOKEN_ISSUER = 'https://appleid.apple.com';
  private readonly appId: string;
  private readonly serviceId: string;

  constructor(private readonly configService: ConfigService) {
    this.appId = configService.get('APPLE_APP_ID');
    this.serviceId = configService.get('APPLE_SERVICE_ID');
  }

  async verifyIdToken(idToken: string): Promise<jwt.JwtPayload> {
    const client = jwks({
      jwksUri: AppleService.JWKS_URI,
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
          issuer: AppleService.TOKEN_ISSUER,
          audience: [this.appId, this.serviceId].filter(Boolean),
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
