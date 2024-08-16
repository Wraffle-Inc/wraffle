import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { AuthFailedException } from "apps/infrastructure/error";
import { ErrorCode, ErrorMessage } from "apps/infrastructure/error/const";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      "public",
      context.getHandler(),
    );

    try {
      const canActivate = await super.canActivate(context);

      if (canActivate) {
        return true;
      }

      throw new AuthFailedException();
    } catch (err) {
      if (isPublic) {
        return true;
      }

      switch (err.response.error) {
        case ErrorCode.EXPIRED_TOKEN:
          throw new AuthFailedException(
            ErrorMessage.EXPIRED_TOKEN,
            ErrorCode.EXPIRED_TOKEN,
          );

        default:
          break;
      }

      throw new AuthFailedException();
    }
  }
}
