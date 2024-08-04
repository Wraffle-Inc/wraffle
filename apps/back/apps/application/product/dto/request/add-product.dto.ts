import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsString } from "class-validator";

export class AddProductDto {
  @ApiProperty({
    example: "상품명",
    description: "상품명",
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: "이미지 URL",
    description: "이미지 URL",
  })
  @IsString()
  imageUrl: string;

  @ApiProperty({
    example: [1, 2],
    description: "태그 ID",
  })
  @IsInt({ each: true })
  @IsArray()
  tagIds: number[];
}
