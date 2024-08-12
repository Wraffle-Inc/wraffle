import { Controller, Post, Body } from "@nestjs/common";
import { CardService } from "apps/application/card/service/card.service";
import { CreateCardDto } from "apps/application/card/dto/request/create-card.dto";
import { ApiOperation, ApiOkResponse } from "@nestjs/swagger";
import {
  IResponse,
  ResponseDto,
} from "apps/application/common/response/response";
import { CreateCardResultDto } from "apps/application/card/dto/response/create-card-result.dto";
import { Public } from "apps/application/common/auth/public.decorator";
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
}
