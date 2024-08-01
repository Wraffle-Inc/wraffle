import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { CardModule } from "apps/application/card/card.module";
import {EventModule} from "apps/application/event/event.module";

@Module({
  imports: [AuthModule, EventModule, CardModule],
  providers: [],
  exports: [AuthModule, EventModule, CardModule],
})
export class ApplicationModule {}
