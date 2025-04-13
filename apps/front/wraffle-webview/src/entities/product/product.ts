export interface Tag {
  id: string;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  imageUrl: string;
}

export interface BaseProductData {
  id: number;
  title: string;
  price: number;
  startDate: string;
  endDate: string;
  announceAt: string;
  description: string;
  etc: string;
  clipCount: number;
  status: string;
  applyCount: number;
  winnerCount: number;
  isClipped: boolean;
  clippingId?: number;
  isCreator: boolean;
  isApplied: boolean;
  createUserId: number;
  tags: Tag[];
  images: string[];
}

export interface RaffleData extends BaseProductData {}

export interface EventData extends BaseProductData {
  products: Product[];
}
