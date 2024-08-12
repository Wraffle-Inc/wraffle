import { ApiProperty } from "@nestjs/swagger";

export class SetDefaultCardResultDto {
  @ApiProperty({ example: 1, description: "카드 ID" })
  id: number;

  @ApiProperty({ example: "My Card", description: "카드 이름" })
  cardName: string;

  @ApiProperty({ example: "KB", description: "카드사 코드" })
  cardCode: string;

  @ApiProperty({ example: "1234-5678-9012-3456", description: "카드 번호" })
  cardNumber: string;

  @ApiProperty({ example: "08/24", description: "카드 만료일" })
  cardExpirationDate: string;

  @ApiProperty({ example: "billing_key", description: "카드 빌링키" })
  billingKey: string;

  @ApiProperty({
    example: true,
    description: "주사용 카드 여부",
  })
  isDefault: boolean;
}
