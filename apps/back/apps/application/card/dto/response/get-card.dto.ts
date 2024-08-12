import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class CardDetailDto {
  @ApiProperty({ example: 1, description: "카드 ID" })
  @IsInt()
  id: number;

  @ApiProperty({ example: "국민", description: "카드사 코드" })
  cardCode: string;

  @ApiProperty({
    example: "**** **** **** 1234",
    description: "마스킹 처리된 카드 번호",
  })
  cardNumber: string;

  @ApiProperty({ example: true, description: "주사용 카드 여부" })
  isDefault: boolean;
}

export class GetCardDto {
  @ApiProperty({ type: [CardDetailDto], description: "카드 목록" })
  items: CardDetailDto[];
}
