'use client';

import {useState} from 'react';
import {Block} from '@/features/manage-history/ui/Block';
import {Header} from '@/shared/ui';
import {HistoryList} from '@/widgets/history-list/ui/HistoryList';
import {Typography} from '@wraffle/ui';

const History = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [category, setCategory] = useState<string>('전체');

  const CATEGORY_LISTS = ['전체', '진행 중', '당첨', '미당첨'];

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

  return (
    <div className='flex h-screen flex-col'>
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

      <HistoryList
        raffles={raffles}
        events={events}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        categoryList={CATEGORY_LISTS}
        category={category}
        setCategory={setCategory}
        BlockComponent={Block}
      />
    </div>
  );
};

export default History;
