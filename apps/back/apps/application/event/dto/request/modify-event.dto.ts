import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsInt, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class ModifyEventDto {
  @ApiProperty({
    example: "이벤트 제목",
    description: "이벤트 제목",
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 10000,
    description: "이벤트 가격",
  })
  @IsInt()
  price: number;

  @ApiProperty({
    example: "2021-08-05T00:00:00.000Z",
    description: "이벤트 시작일",
  })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({
    example: "2021-08-05T00:00:00.000Z",
    description: "이벤트 종료일",
  })
  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @ApiProperty({
    example: "2021-08-05T00:00:00.000Z",
    description: "당첨 발표일",
  })
  @IsDate()
  @Type(() => Date)
  announceAt: Date;

  @ApiProperty({
    example: "이벤트 설명",
    description: "이벤트 설명",
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: "기타",
    description: "기타",
  })
  @IsOptional()
  @IsString()
  etc: string;

  @ApiProperty({
    example: 1,
    description: "카테고리 ID",
  })
  @IsInt()
  categoryId: number;

  @ApiProperty({
    example: [1, 2],
    description: "태그 ID",
  })
  @IsInt({ each: true })
  @IsArray()
  tagIds: number[];

  @ApiProperty({
    example: ["이미지 URL"],
    description: "이미지 URL",
  })
  @IsString({ each: true })
  images: string[];
}
