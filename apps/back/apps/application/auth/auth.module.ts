import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";

import { JwtAuthGuard } from "../common/auth/jwt-auth.guard";
import { IRoleStrategyName } from "../common/auth/role-strategy.interface";
import { RolesGuard } from "../common/auth/roles.guard";
import { JwtStrategy } from "./jwt.strategy";
import { RoleStrategy } from "./role.strategy";
import { AuthService } from "./service/auth.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RefreshTokenService } from "apps/application/auth/service/refresh-token.service";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: configService.get<string>("JWT_ACCESS_EXPIRATION_TIME"),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    JwtStrategy,
    {
      provide: IRoleStrategyName,
      useClass: RoleStrategy,
    },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    AuthService,
    RefreshTokenService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
