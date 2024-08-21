import { Type } from "class-transformer";
import { IsNumber, IsOptional, Max } from "class-validator";

const DEFAULT_ITEMS_PER_PAGE = 30;
const MAX_ITEMS_PER_PAGE = 1000;

export class PaginateDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Max(MAX_ITEMS_PER_PAGE)
  itemsPerPage?: number = DEFAULT_ITEMS_PER_PAGE;

  get limit(): number {
    return this.itemsPerPage;
  }

  get offset(): number {
    const page = this.page ?? 1;
    const perPage = this.itemsPerPage;

    return (page - 1) * perPage;
  }
}
