import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
} from "@nestjs/common";
import { CardService } from "apps/application/card/service/card.service";
import { CreateCardDto } from "apps/application/card/dto/request/create-card.dto";
import { ApiOperation, ApiOkResponse } from "@nestjs/swagger";
import {
  IResponse,
  ResponseDto,
} from "apps/application/common/response/response";
import { CreateCardResultDto } from "apps/application/card/dto/response/create-card-result.dto";
import { Public } from "apps/application/common/auth/public.decorator";
import { GetCardDto } from "apps/application/card/dto/response/get-card.dto";
import { SetDefaultCardResultDto } from "apps/application/card/dto/response/set-default-card-result.dto";
import { SetDefaultCardDto } from "apps/application/card/dto/request/set-default-card.dto";
// import { CurrentUser } from "apps/application/common/auth/current-user.decorator";

@Controller("users/me/cards")
export class CardController {
  constructor(private readonly cardService: CardService) {}

  // TODO: @CurrentUser()로 사용자 정보 가져오기, @Public() 제거하기
  @ApiOperation({
    summary: "카드 생성",
    operationId: "createCard",
    tags: ["card"],
  })
  @ApiOkResponse({
    type: ResponseDto(CreateCardResultDto, "CreateCardResult"),
  })
  @Post()
  @Public()
  async createCard(
    @Body() dto: CreateCardDto
    // @CurrentUser() user: User
  ): Promise<IResponse<CreateCardResultDto>> {
    return this.cardService.createCard(dto);
  }

  // TODO: @CurrentUser()로 사용자 정보 가져오기, @Public() 제거하기
  @ApiOperation({
    summary: "사용자 카드 목록 조회",
    operationId: "getCards",
    tags: ["card"],
  })
  @ApiOkResponse({
    type: ResponseDto(GetCardDto, "GetCards"),
  })
  @Get()
  @Public()
  async getCards() // @CurrentUser() user: User
  : Promise<IResponse<GetCardDto>> {
    return this.cardService.getCards(1);
  }

  // TODO: @Public() 제거하기
  @ApiOperation({
    summary: "카드 삭제",
    operationId: "deleteCard",
    tags: ["card"],
  })
  @Delete(":id")
  @Public()
  async deleteCard(
    @Param("id", ParseIntPipe) id: number
  ): Promise<IResponse<null>> {
    return this.cardService.deleteCard(id);
  }

  // TODO: @Public() 제거하기
  @ApiOperation({
    summary: "주사용 카드 변경",
    operationId: "setDefaultCard",
    tags: ["card"],
  })
  @ApiOkResponse({
    type: ResponseDto(SetDefaultCardResultDto, "SetDefaultCardResult"),
  })
  @Patch(":id")
  @Public()
  async setDefaultCard(
    @Param("id") id: number,
    @Body() dto: SetDefaultCardDto
  ): Promise<IResponse<SetDefaultCardResultDto>> {
    return this.cardService.setDefaultCard(id, dto);
  }
}
