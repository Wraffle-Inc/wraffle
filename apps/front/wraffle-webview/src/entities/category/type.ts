export interface CategoryItem {
  id: number;
  name: string;
  parentId: number | null;
  depth: number;
}
