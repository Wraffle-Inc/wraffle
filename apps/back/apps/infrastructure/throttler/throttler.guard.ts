import { ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerGuard as BaseThrottlerGuard } from '@nestjs/throttler';
import { TooManyRequestsException } from 'apps/infrastructure/error';

@Injectable()
export class ThrottlerGuard extends BaseThrottlerGuard {
  protected getTracker(req: Record<string, any>): string {
    const ip = req.ips.length ? req.ips[0] : req.ip;
    const url = req.url;
    return `${ip}-${url}`;
  }

  protected throwThrottlingException(context: ExecutionContext): void {
    throw new TooManyRequestsException();
  }
}
