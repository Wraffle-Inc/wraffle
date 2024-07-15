import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { JwtAuthGuard } from "../common/auth/jwt-auth.guard";
import { IRoleStrategyName } from "../common/auth/role-strategy.interface";
import { RolesGuard } from "../common/auth/roles.guard";
import { JwtStrategy } from "./jwt.strategy";
import { RoleStrategy } from "./role.strategy";
import { AuthService } from "./service/auth.service";
import { User } from "apps/domain/user/user.entity";

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({ secret: process.env.JWT_SECRET }),
    }),
    TypeOrmModule.forFeature([User]),
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
  ],
  exports: [AuthService],
})
export class AuthModule {}
