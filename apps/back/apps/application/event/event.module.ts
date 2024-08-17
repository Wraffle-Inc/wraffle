import { Module } from "@nestjs/common";
import { EventService } from "apps/application/event/service/event.service";

@Module({
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
