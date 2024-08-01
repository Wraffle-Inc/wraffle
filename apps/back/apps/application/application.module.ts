import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import {EventModule} from "apps/application/event/event.module";

@Module({
  imports: [AuthModule, EventModule],
  providers: [],
  exports: [AuthModule, EventModule],
})
export class ApplicationModule {}
