import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class GetEventDto {
  @ApiProperty({
    example: 1,
    description: "이벤트 ID",
  })
  @IsInt()
  id: number;

  @ApiProperty({
    example: "이벤트 제목",
    description: "이벤트 제목",
  })
  title: string;

  @ApiProperty({
    example: 10000,
    description: "이벤트 가격",
  })
  price: number;

  @ApiProperty({
    example: "2021-08-05T00:00:00.000Z",
    description: "이벤트 시작일",
  })
  startDate: Date;

  @ApiProperty({
    example: "2021-08-05T00:00:00.000Z",
    description: "이벤트 종료일",
  })
  endDate: Date;

  @ApiProperty({
    example: "2021-08-05T00:00:00.000Z",
    description: "당첨 발표일",
  })
  announceAt: Date;

  @ApiProperty({
    example: "이벤트 유의사항",
    description: "이벤트 유의사항",
  })
  etc: string;

  @ApiProperty({
    example: "10",
    description: "스크랩 수",
  })
  clipCount: number;

  @ApiProperty({
    example: "10",
    description: "이벤트 응모자 수",
  })
  applyCount: number;

  @ApiProperty({
    example: "1",
    description: "이벤트 주최자 ID",
  })
  createUserId: number;

  @ApiProperty({
    example: "[1, 2, 3]",
    description: "태그 ID 리스트",
  })
  tagIds: number[];

  @ApiProperty({
    example: "[ '이미지 URL1', '이미지 URL2' ]",
    description: "이미지 URL 리스트",
  })
  images: string[];
}
