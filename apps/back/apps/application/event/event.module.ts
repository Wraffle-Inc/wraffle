import { Module } from "@nestjs/common";
import { EventService } from "apps/application/event/service/event.service";
import { EventController } from "apps/front-api/src/event/event.controller";

@Module({
  providers: [EventService],
  exports: [EventService],
  controllers: [EventController],
})
export class EventModule {}
