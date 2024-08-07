import { Exclude, Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

@Exclude()
export class LoginResultDto {
  @ApiProperty({
    example: "eyJhbGci",
  })
  @Expose()
  accessToken: string;

  @ApiProperty({
    example: "eyJhbGci",
  })
  @Expose()
  refreshToken: string;
}
