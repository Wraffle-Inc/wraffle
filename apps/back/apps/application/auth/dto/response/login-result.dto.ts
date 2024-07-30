import { Exclude, Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

@Exclude()
export class LoginResultDto {
  @ApiProperty({
    example: "eyJhbGci",
  })
  @Expose()
  token: string;
}
