import { ApiProperty } from "@nestjs/swagger";
import { GetProductDto } from "apps/application/product/dto/request/get-product.dto";
import { Exclude } from "class-transformer";
import { EventHashtag } from "apps/domain/event/event-hashtag.entity";
import { EventProduct } from "apps/domain/event/event-product.entity";

export class GetEventDto {
  @ApiProperty({
    example: 1,
    description: "이벤트 ID",
  })
  id: number;

  @ApiProperty({
    example: "EVENT",
    description: "타입",
  })
  type: string;

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
    example: "waiting",
    description: "이벤트 상태",
  })
  status: string;

  @ApiProperty({
    example: "1",
    description: "이벤트 주최자 ID",
  })
  createUserId: number;

  @ApiProperty({
    example: "[ '태그1', '태그2' ]",
    description: "태그 리스트",
  })
  tags: string[];

  @ApiProperty({
    example: "[ '이미지 URL1', '이미지 URL2' ]",
    description: "이미지 URL 리스트",
  })
  images: string[];

  @ApiProperty({
    example: [
      {
        id: 1,
        name: "상품 이름",
        price: 10000,
        imageUrl: "상품 이미지 URL",
        tagIds: [1, 2, 3],
      },
    ],
    description: "상품 리스트",
  })
  products: GetProductDto[];

  @Exclude()
  eventHashtags: EventHashtag[];

  @Exclude()
  eventProducts: EventProduct[];
}
