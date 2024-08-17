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

  // TODO: 추후 Redis에 키로 저장하여 스케쥴러로 한 번에 업데이트 하도록 구현
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
