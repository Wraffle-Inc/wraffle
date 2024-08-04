import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { CardModule } from "apps/application/card/card.module";

@Module({
  imports: [AuthModule, CardModule],
  providers: [],
  exports: [AuthModule, CardModule],
})
export class ApplicationModule {}
