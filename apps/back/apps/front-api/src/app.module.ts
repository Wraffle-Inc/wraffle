import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import { PassportModule } from "@nestjs/passport";
import { TerminusModule } from "@nestjs/terminus";
import { ThrottlerModule } from "@nestjs/throttler";
import { ApplicationModule } from "apps/application/application.module";
import { HttpExceptionFilter } from "apps/infrastructure/error/exception.filter";
import { InfrastructureModule } from "apps/infrastructure/infrastructure.module";
import { HttpLoggerMiddleware } from "apps/infrastructure/logger/http-logger.middleware";
import { envValidationSchema } from "env.config";

import { AuthController } from "./auth/auth.controller";
import { HealthController } from "./health/health.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    PassportModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,
          limit: 1000,
        },
      ],
    }),
    TerminusModule,
    ApplicationModule,
    InfrastructureModule.forRoot(),
  ],
  providers: [
    HttpLoggerMiddleware,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  controllers: [AuthController, HealthController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes("*");
  }
}
