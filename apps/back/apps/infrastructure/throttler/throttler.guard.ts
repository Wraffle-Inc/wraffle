import { ExecutionContext, Injectable } from "@nestjs/common";
import { ThrottlerGuard as BaseThrottlerGuard } from "@nestjs/throttler";
import { TooManyRequestsException } from "apps/infrastructure/error";

@Injectable()
export class ThrottlerGuard extends BaseThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    const ip = req.ips.length ? req.ips[0] : req.ip;
    const url = req.url;
    return `${ip}-${url}`;
  }

  protected async throwThrottlingException(
    context: ExecutionContext,
  ): Promise<void> {
    throw new TooManyRequestsException();
  }
}
