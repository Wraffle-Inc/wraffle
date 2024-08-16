import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { AuthService } from "./service/auth.service";
import { User } from "apps/domain/user/user.entity";
import { AuthFailedException } from "apps/infrastructure/error";
import { ErrorCode, ErrorMessage } from "apps/infrastructure/error/const";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any): Promise<User> {
    const now = new Date();
    const expiredAt = new Date(payload.exp * 1000);

    const isTokenExpired = now > expiredAt;

    if (isTokenExpired) {
      throw new AuthFailedException(
        ErrorMessage.EXPIRED_TOKEN,
        ErrorCode.EXPIRED_TOKEN,
      );
    }

    return this.authService.authUserWithIdAndRole(payload.sub, payload.role);
  }
}
