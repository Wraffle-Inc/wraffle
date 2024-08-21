import { Exclude, Expose } from "class-transformer";

@Exclude()
export class PaginationMetaData {
  @Expose()
  totalItemCount: number;

  @Expose()
  currentItemCount: number;

  @Expose()
  totalPage: number;

  @Expose()
  currentPage: number;

  @Expose()
  itemsPerPage: number;
}
