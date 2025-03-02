'use client';

import SettlementListBoardContents from '../../_components/SettlementListBoardContents';
import ListBoardHeader from '@/app/_components/ListBoardHeader';
import Title from '@/app/_components/Title';
import settlementListQuery from '@/app/api/settlementList/query';

const labels = ['이름', '요청일', '계정', '요청금액', '남은금액'];

const SettlementListClient = () => {
  const {data} = settlementListQuery();

  if (!data) return;

  return (
    <div className='w-full'>
      <Title>정산관리</Title>
      <ListBoardHeader labels={labels} isCheckBox={true} />
      <SettlementListBoardContents isCheckBox={true} contents={data} />
    </div>
  );
};

export default SettlementListClient;
