export interface ProductTag {
  id: string;
  name: string;
}

export interface ProductData {
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
  createUserId: number;
  type: string;
  tags: ProductTag[];
  images: string[];
}

export const sampleProductData: ProductData = {
  id: 1,
  title: '[Vans] 올드스쿨',
  price: 78000,
  startDate: '2024-07-31T00:00:00.000Z',
  endDate: '2024-08-02T00:00:00.000Z',
  announceAt: '2024-08-03T00:00:00.000Z',
  description:
    '제작 박스로 준비해드립니다. 오후 3시 이전 결제 완료 시 택배 출고 드립니다. 당일 상품 출고 마감 시간 3시입니다.',
  etc: '유의사항',
  clipCount: 0,
  status: 'waiting',
  applyCount: 0,
  createUserId: 1,
  type: 'RAFFLE',
  tags: [
    {id: '1', name: 'Vans'},
    {id: '2', name: '래플'},
  ],
  images: [
    'https://github.com/user-attachments/assets/73684618-8305-4a78-bcd6-e36342b46c22',
    'https://github.com/user-attachments/assets/4a104905-0106-4b8a-8dcd-06926162e2e6',
  ],
};
