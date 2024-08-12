import { Module } from "@nestjs/common";
import { CardService } from "apps/application/card/service/card.service";
import { CardController } from "apps/front-api/src/card/card.controller";

@Module({
  providers: [CardService],
  exports: [CardService],
  controllers: [CardController],
})
export class CardModule {}
