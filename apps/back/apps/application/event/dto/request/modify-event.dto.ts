import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";

export class ModifyEventDto {
  @ApiProperty({
    example: "이벤트 제목",
    description: "이벤트 제목",
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 10000,
    description: "이벤트 가격",
  })
  @IsNotEmpty()
  @IsInt()
  price: number;

  @ApiProperty({
    example: "2021-08-05T00:00:00.000Z",
    description: "이벤트 시작일",
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({
    example: "2021-08-05T00:00:00.000Z",
    description: "이벤트 종료일",
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @ApiProperty({
    example: "2021-08-05T00:00:00.000Z",
    description: "당첨 발표일",
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  announceAt: Date;

  @ApiProperty({
    example: "이벤트 설명",
    description: "이벤트 설명",
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: "기타",
    description: "기타",
  })
  @IsNotEmpty()
  @IsString()
  etc: string;

  @ApiProperty({
    example: 1,
    description: "카테고리 ID",
  })
  @IsNotEmpty()
  @IsInt()
  categoryId: number;

  @ApiProperty({
    example: [1, 2],
    description: "태그 ID",
  })
  @IsNotEmpty()
  @IsInt({ each: true })
  @IsArray()
  tagIds: number[];

  @ApiProperty({
    example: ["이미지 URL"],
    description: "이미지 URL",
  })
  @IsNotEmpty()
  @IsString({ each: true })
  images: string[];
}
