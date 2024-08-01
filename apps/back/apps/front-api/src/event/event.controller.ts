import {Controller} from "@nestjs/common";
import {EventService} from "apps/application/event/service/event.service";

@Controller("events")
export class EventController {
    constructor(private readonly eventService: EventService) {
    }
}