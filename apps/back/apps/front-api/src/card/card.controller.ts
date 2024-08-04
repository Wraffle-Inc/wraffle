import { Controller } from "@nestjs/common";
import { CardService } from "apps/application/card/service/card.service";

@Controller("users/me/cards")
export class CardController {
  constructor(private readonly cardServie: CardService) {}
}
