import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [AuthModule],
  providers: [],
  exports: [AuthModule],
})
export class ApplicationModule {}
