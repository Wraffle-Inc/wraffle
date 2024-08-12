import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  CustomResponse,
  IResponse,
} from "apps/application/common/response/response";
import { Card } from "apps/domain/card/card.entity";
import { CreateCardDto } from "apps/application/card/dto/request/create-card.dto";
import { CreateCardResultDto } from "apps/application/card/dto/response/create-card-result.dto";
import { Transactional } from "typeorm-transactional";
import { plainToInstance } from "class-transformer";

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>
  ) {}

  @Transactional()
  async createCard(
    dto: CreateCardDto
  ): Promise<IResponse<CreateCardResultDto>> {
    // 카드 등록
    // TODO: SignUp API 추가되면, @CurrentUser()로 사용자 정보 가져오기
    const card = this.cardRepository.create({
      ...dto,
      userId: 1,
    });

    await this.cardRepository.save(card);

    // 카드 등록 결과 DTO 생성
    const createCardResultDto = plainToInstance(CreateCardResultDto, {
      id: card.id,
      cardName: card.cardName,
      cardCode: card.cardCode,
      cardNumber: card.cardNumber,
      cardExpirationDate: card.cardExpirationDate,
      billingKey: card.billingKey,
      isDefault: card.isDefault,
    });

    return new CustomResponse<CreateCardResultDto>(
      200,
      "C001",
      createCardResultDto
    );
  }
}
