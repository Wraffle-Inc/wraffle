import { IsBoolean, IsEmail, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignUpDto {
  @ApiProperty({
    example: "test",
    description: "이름",
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: "user@gmail.com",
    description: "이메일",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "asdfasdf",
    description: "비밀번호",
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: "testNickname",
    description: "닉네임",
  })
  @IsString()
  nickname: string;

  @ApiProperty({
    example: "01011112222",
    description: "전화번호",
  })
  @MaxLength(11)
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    example: true,
    description: "서비스 이용약관 동의 여부",
  })
  @IsBoolean()
  isAgreed: boolean;

  @ApiProperty({
    example: true,
    description: "개인정보 처리방침 동의 여부",
  })
  @IsBoolean()
  isPrivacyAgreed: boolean;

  @ApiProperty({
    example: true,
    description: "제3자 정보 제공 동의 여부",
  })
  @IsBoolean()
  isThirdAgreed: boolean;

  @ApiProperty({
    example: true,
    description: "마케팅 정보 수신 동의 여부(선택)",
  })
  @IsBoolean()
  isMarketingAgreed: boolean;
}
