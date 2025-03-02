'use client';

import Title from '@/app/_components/Title';
import settlementListQuery from '@/app/api/settlementList/query';

const SettlementListClient = () => {
  const {data} = settlementListQuery();

  if (!data) return;

  return (
    <div className='w-full'>
      <Title>정산관리</Title>
    </div>
  );
};

export default SettlementListClient;
