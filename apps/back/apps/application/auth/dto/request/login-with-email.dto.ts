import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginWithEmailDto {
  /*
   * 이메일
   *
   * @example user@gmail.com
   */
  @ApiProperty()
  @IsEmail()
  @IsString()
  email: string;

  /*
   * 비밀번호
   *
   * @example asdfasdf
   */
  @ApiProperty()
  @IsString()
  password: string;
}
