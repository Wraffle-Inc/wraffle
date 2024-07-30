import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginWithEmailDto {
  @ApiProperty({
    example: "user@gmail.com",
    description: "이메일",
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    example: "asdfasdf",
    description: "비밀번호",
  })
  @IsString()
  password: string;
}
