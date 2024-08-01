import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {EventService} from "apps/application/event/service/event.service";
import {Event} from "apps/domain/event/event.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Event])],
    providers: [EventService],
    exports: [EventService],
})
export class EventModule {}
