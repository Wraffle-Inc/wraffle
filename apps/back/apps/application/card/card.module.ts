import { Module } from "@nestjs/common";
import { CardService } from "apps/application/card/service/card.service";

@Module({
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}
