interface BasePayload {
  title: string;
  price: number;
  startDate: string;
  endDate: string;
  announceAt: string;
  winnerCount: number;
  description: string;
  etc: string;
  categoryId: number;
  tagIds: number[];
  images: string[];
}

export interface RafflePayload extends BasePayload {}

interface Product {
  title: string;
  imageUrl: string;
  tagIds: number[];
}

export interface EventPayload extends BasePayload {
  products: Product[];
}

export type Payload =
  | ({type: 'raffle'} & RafflePayload)
  | ({type: 'event'} & EventPayload);

export interface ProductResponse {
  id: number;
  thumbnail: string;
}
