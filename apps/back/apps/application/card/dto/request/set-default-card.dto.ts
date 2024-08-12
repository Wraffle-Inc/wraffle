import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class SetDefaultCardDto {
  @ApiProperty({ example: true, description: "주사용 카드 여부" })
  @IsBoolean()
  isDefault: boolean;
}
