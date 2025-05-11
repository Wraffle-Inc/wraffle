export interface Product {
  title: string;
  imageUrl: File;
}

interface createState {
  title?: string;
  categoryId?: string;
  tagIds?: number[];
  price?: string;
  startDate?: Date;
  endDate?: Date;
  announceAt?: Date;
  winnerCount?: string;
  images?: File[];
  etc?: string;
}

export interface EventCreateState extends createState {
  products?: Product[];
}

export interface RaffleCreateState extends createState {}
