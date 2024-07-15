import { applyDecorators, UseGuards } from "@nestjs/common";

import { ThrottlerGuard } from "./throttler.guard";
import { Throttle } from "@nestjs/throttler";

export function Throttler(limit?: number, ttl?: number) {
  return applyDecorators(
    UseGuards(ThrottlerGuard),
    Throttle({
      default: {
        limit: limit ?? 1,
        ttl: ttl ?? 60,
      },
    }),
  );
}
