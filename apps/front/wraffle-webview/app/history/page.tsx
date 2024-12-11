'use client';

import {useState} from 'react';
import {Block} from '@/features/manage-history/ui/Block';
import {Header} from '@/shared/ui';
import {GenericTabs} from '@/shared/ui/tabs/GenericTabs';
import {APPLY_EMPTY_INFO} from '@/widgets/history-list/config/const';
import {ProductList} from '@/widgets/history-list/ui/ProductList';
import {Typography} from '@wraffle/ui';

// api 연동시 사라질 코드 입니다. raffles, events
const raffles = [
  {
    id: 1,
    title: '제목',
    applyUid: 'A-12352-51',
    applyDate: '2024-01-01',
    targetStatus: 'WAITING',
    paymentMethod: 'CARD',
    estimatePayAmount: 20000,
  },
  {
    id: 2,
    title: '제목2',
    applyUid: 'A-12352-51',
    applyDate: '2024-01-01',
    targetStatus: 'WAITING',
    paymentMethod: 'CARD',
    estimatePayAmount: 20000,
  },
  {
    id: 3,
    title: '제목3',
    applyUid: 'A-12352-51',
    applyDate: '2024-01-01',
    targetStatus: 'WAITING',
    paymentMethod: 'CARD',
    estimatePayAmount: 20000,
  },
];

const events = [];

const APPLY_CATEGORY_LISTS = ['전체', '진행 중', '당첨', '미당첨'];

const History = () => {
  const [activeTab, setActiveTab] = useState<string>('raffle');
  const [category, setCategory] = useState<string>('전체');

  return (
    <div className='h-full'>
      <Header withUnderline>
        <Header.Left>
          <Header.BackButton></Header.BackButton>
        </Header.Left>
        <Header.Middle>
          <Typography as='p' size='p1'>
            응모내역
          </Typography>
        </Header.Middle>
      </Header>

      <div className='h-2.5 w-full bg-[#F9FAFB]'></div>

      <GenericTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        category={category}
        setCategory={setCategory}
        chipList={APPLY_CATEGORY_LISTS}
      >
        <GenericTabs.Raffle>
          <ProductList
            products={raffles}
            block={product => <Block key={product.id} product={product} />}
            emptyInfo={APPLY_EMPTY_INFO}
          />
        </GenericTabs.Raffle>

        <GenericTabs.Event>
          <ProductList
            products={events}
            block={product => <Block key={product.id} product={product} />}
            emptyInfo={APPLY_EMPTY_INFO}
          />
        </GenericTabs.Event>
      </GenericTabs>
    </div>
  );
};

export default History;
