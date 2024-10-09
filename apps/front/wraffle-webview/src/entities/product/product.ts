export interface Tag {
  id: string;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  tags: Tag[];
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
  applyStatus: boolean;
  createUserId: number;
  tags: Tag[];
  images: string[];
}

export interface RaffleData extends BaseProductData {}

export interface EventData extends BaseProductData {
  products: Product[];
}

export const sampleRaffleData: RaffleData = {
  id: 1,
  title: '[Vans] 올드스쿨',
  price: 78000,
  startDate: '2024-07-31T00:00:00.000Z',
  endDate: '2024-08-02T00:00:00.000Z',
  announceAt: '2024-08-03T00:00:00.000Z',
  description:
    '제작 박스로 준비해드립니다. 오후 3시 이전 결제 완료 시 택배 출고 드립니다. 당일 상품 출고 마감 시간 3시입니다.',
  etc: '유의사항',
  clipCount: 53,
  status: 'before',
  applyCount: 0,
  applyStatus: false,
  createUserId: 1,
  tags: [
    {id: '1', name: 'Vans'},
    {id: '2', name: '래플'},
  ],
  images: [
    'https://github.com/user-attachments/assets/73684618-8305-4a78-bcd6-e36342b46c22',
    'https://github.com/user-attachments/assets/4a104905-0106-4b8a-8dcd-06926162e2e6',
  ],
};

export const sampleEventData: EventData = {
  id: 1,
  title: '이벤트 제목',
  price: 10000,
  startDate: '2021-08-05T00:00:00.000Z',
  endDate: '2021-08-05T00:00:00.000Z',
  announceAt: '2021-08-05T00:00:00.000Z',
  description: '어쩌고 설명 저쩌고 설명',
  etc: '이벤트 유의사항',
  clipCount: 10,
  applyCount: 10,
  status: 'waiting',
  applyStatus: false,
  createUserId: 1,
  tags: [
    {id: '1', name: 'Vans'},
    {id: '2', name: '래플'},
  ],
  images: [
    'https://github.com/user-attachments/assets/73684618-8305-4a78-bcd6-e36342b46c22',
    'https://github.com/user-attachments/assets/4a104905-0106-4b8a-8dcd-06926162e2e6',
  ],
  products: [
    {
      id: 1,
      name: '1번 상품',
      price: 2210000,
      imageUrl:
        'https://github.com/user-attachments/assets/4a104905-0106-4b8a-8dcd-06926162e2e6',
      tags: [
        {id: '1', name: 'Vans'},
        {id: '2', name: '래플'},
      ],
    },
    {
      id: 2,
      name: '2번 상품',
      price: 10000,
      imageUrl:
        'https://github.com/user-attachments/assets/4a104905-0106-4b8a-8dcd-06926162e2e6',
      tags: [
        {id: '1', name: 'Vans'},
        {id: '2', name: '래플'},
      ],
    },
    {
      id: 3,
      name: '3번 상품',
      price: 10000,
      imageUrl:
        'https://github.com/user-attachments/assets/4a104905-0106-4b8a-8dcd-06926162e2e6',
      tags: [
        {id: '1', name: 'Vans'},
        {id: '2', name: '래플'},
      ],
    },
  ],
};
