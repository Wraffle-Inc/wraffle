import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { EventService } from "apps/application/event/service/event.service";
import { Observable, tap } from "rxjs";

@Injectable()
export class EventViewCountInterceptor implements NestInterceptor {
  constructor(private readonly eventService: EventService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const eventId = request.params.id;

    return next.handle().pipe(
      tap(async () => {
        if (eventId) {
          await this.eventService.increaseViewCount(eventId);
        }
      }),
    );
  }
}
