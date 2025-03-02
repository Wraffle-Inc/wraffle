'use client';

import SettlementListBoardContents from '../../_components/SettlementListBoardContents';
import ListBoardHeader from '@/app/_components/ListBoardHeader';
import Title from '@/app/_components/Title';
import settlementListQuery from '@/app/api/settlementList/query';
import LABEL from '@/app/config/labels';

const SettlementListClient = () => {
  const {data} = settlementListQuery();

  if (!data) return;

  return (
    <div className='w-full'>
      <Title>정산관리</Title>
      <ListBoardHeader labels={LABEL.SETTLEMENT} isCheckBox={true} />
      <SettlementListBoardContents isCheckBox={true} contents={data} />
    </div>
  );
};

export default SettlementListClient;
