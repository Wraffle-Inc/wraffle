import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsString } from "class-validator";

export class GetProductDto {
  @ApiProperty({
    example: "상품명",
    description: "상품명",
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: "이미지 URL",
    description: "이미지 URL",
  })
  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @ApiProperty({
    example: [1, 2],
    description: "태그 ID",
  })
  @IsNotEmpty()
  @IsInt({ each: true })
  @IsArray()
  tagIds: number[];
}
