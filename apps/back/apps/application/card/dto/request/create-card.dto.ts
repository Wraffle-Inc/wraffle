import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class CreateCardDto {
  @ApiProperty({ example: "카드 이름", description: "카드 이름" })
  @IsString()
  cardName: string;

  @ApiProperty({ example: "KB", description: "카드사 코드" })
  @IsString()
  cardCode: string;

  @ApiProperty({ example: "1234-5678-9012-3456", description: "카드 번호" })
  @IsString()
  cardNumber: string;

  @ApiProperty({ example: "12", description: "카드 비밀번호 앞 2자리" })
  @IsString()
  cardPassword: string;

  @ApiProperty({ example: "08/24", description: "카드 만료일" })
  @IsString()
  cardExpirationDate: string;

  @ApiProperty({ example: "billing_key", description: "카드 빌링키" })
  @IsString()
  billingKey: string;

  @ApiProperty({
    example: true,
    description: "주사용 카드 여부",
    default: false,
  })
  @IsBoolean()
  isDefault: boolean;
}
