export interface CursorPagination {
  totalItemCount: number;
  itemsPerPage: number;
  hasNextData: boolean;
  cursor: number;
}
