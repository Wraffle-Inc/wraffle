export interface TagList {
  id: number;
  name: string;
  uuid: string;
}

export interface TagQueryParams {
  itemsPerPage: number;
  uuid: string;
  prefix: string;
}

export interface CreateTag {
  id: number;
  name: string;
}

export interface CreateBody {
  name: string;
}

export interface CreateTagAndAddToList {
  tag: string;
  createTag: (tag: string) => Promise<CreateTag>;
  tagIds: number[];
  onTagChange: (newTags: number[]) => void;
}

export interface AddTagFromUserInputIfDuplicate {
  tag: string;
  serverTags?: CreateTag[];
  tagIds: number[];
  onTagChange: (newTags: number[]) => void;
}

export interface AddTagFromServerData {
  id: number;
  tagIds: number[];
  onTagChange: (newTags: number[]) => void;
}
