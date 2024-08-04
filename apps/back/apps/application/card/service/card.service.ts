import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  CustomResponse,
  IResponse,
} from "apps/application/common/response/response";
import { Card } from "apps/domain/card/card.entity";
import { Transactional } from "typeorm-transactional";

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>
  ) {}
}
