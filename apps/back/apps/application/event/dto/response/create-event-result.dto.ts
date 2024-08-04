import { ApiProperty } from "@nestjs/swagger";

export class CreateEventResultDto {
  @ApiProperty({
    example: 1,
    description: "이벤트 ID",
  })
  id: number;

  @ApiProperty({
    example: "이벤트 썸네일 URL",
    description: "이벤트 썸네일",
  })
  thumbnail: string;
}
