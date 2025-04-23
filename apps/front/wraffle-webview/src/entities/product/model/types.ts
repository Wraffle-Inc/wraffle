export interface Product {
  title: string;
  imageUrl: string;
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
  images?: string[];
  etc?: string;
}

export interface EventCreateState extends createState {
  products?: Product[];
}

export interface RaffleCreateState extends createState {}
