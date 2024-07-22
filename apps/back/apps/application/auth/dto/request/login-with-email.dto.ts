import { IsEmail, IsString } from "class-validator";

export class LoginWithEmailDto {
  /**
   * 이메일
   *
   * @example user@gmail.com
   */
  @IsEmail()
  @IsString()
  email: string;

  /**
   * 비밀번호
   *
   * @example asdfasdf
   */
  @IsString()
  password: string;
}
