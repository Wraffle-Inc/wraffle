import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RefreshTokenDto {
  @ApiProperty({
    description: "Refresh Token",
    example: "REFRESH_TOKEN",
  })
  @IsString()
  refreshToken: string;
}
