export interface TagList {
  id: number;
  name: string;
  uuid: string;
}

export interface TagQueryParams {
  itemsPerPage: number;
  cursor: string;
  prefix: string;
}

export interface CreateTag {
  id: number;
  name: string;
}

export interface CreateBody {
  name: string;
}
