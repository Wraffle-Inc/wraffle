import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from "@nestjs/common";
import { EventService } from "apps/application/event/service/event.service";
import { CreateEventDto } from "apps/application/event/dto/request/create-event.dto";
import {
  IResponse,
  ResponseDto,
} from "apps/application/common/response/response";
import { CreateEventResultDto } from "apps/application/event/dto/response/create-event-result.dto";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { Public } from "apps/application/common/auth/public.decorator";
import { GetEventDto } from "apps/application/event/dto/response/get-event.dto";
import { EventViewCountInterceptor } from "apps/application/event/interceptor/event-view-count.interceptor";
import { ModifyEventDto } from "apps/application/event/dto/request/modify-event.dto";

@Controller("events")
export class EventController {
  constructor(private readonly eventService: EventService) {}

  // TODO: @CurrentUser()로 사용자 정보 가져와서 createUserId에 넣어주기, @Public() 제거
  @ApiOperation({
    summary: "이벤트 생성",
    operationId: "createEvent",
    tags: ["event"],
  })
  @ApiOkResponse({
    type: ResponseDto(CreateEventResultDto, "CreateEventResult"),
  })
  @Post()
  @Public()
  async createEvent(
    @Body() dto: CreateEventDto,
    // @CurrentUser() user: any,
  ): Promise<IResponse<CreateEventResultDto>> {
    return this.eventService.createEvent(dto);
  }

  @ApiOperation({
    summary: "이벤트 조회",
    operationId: "getEventById",
    tags: ["event"],
  })
  @ApiOkResponse({
    type: ResponseDto(GetEventDto, "GetEvent"),
  })
  @Get(":id")
  @Public()
  @UseInterceptors(EventViewCountInterceptor)
  async getEventById(@Param("id") id: number): Promise<IResponse<GetEventDto>> {
    return this.eventService.getEventById(id);
  }

  @ApiOperation({
    summary: "이벤트 수정",
    operationId: "modifyEvent",
    tags: ["event"],
  })
  @Put(":id")
  @Public()
  async modifyEventById(
    @Param("id") id: number,
    @Body() dto: ModifyEventDto,
  ): Promise<IResponse<any>> {
    return this.eventService.modifyEventById(id, dto);
  }
}
