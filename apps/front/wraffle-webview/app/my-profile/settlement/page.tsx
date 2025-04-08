'use client';

import {Suspense} from 'react';
import {Header} from '@/shared/ui';
import {SettlementList} from '@/widgets/my-profile/ui/SettlementList';
import {
  SkeletonUserInfo,
  SkeletonSettlementList,
} from '@/widgets/my-profile/ui/SkeletonSettlement';
import {UserSettlementInfo} from '@/widgets/my-profile/ui/UserSettlementInfo';
import {Typography} from '@wraffle/ui';

const SettlementPage = () => {
  return (
    <div>
      <Header>
        <Header.Left>
          <Header.BackButton />
        </Header.Left>
        <Header.Middle>
          <Typography size='h4' color='zinc700'>
            내 정산금 관리
          </Typography>
        </Header.Middle>
      </Header>

      <Suspense fallback={<SkeletonUserInfo />}>
        <UserSettlementInfo />
      </Suspense>

      <div className='mt-4 h-2.5 border border-zinc-200 bg-zinc-100' />

      <div className='p-8 pb-20'>
        <Typography size='h5' color='zinc500' className='font-normal'>
          최근 정산 내역
        </Typography>
        <li className='flex h-14 items-center justify-between border-b-2 border-b-zinc-100'>
          <div className='flex h-full w-20 items-center'>
            <Typography size='p4'>일자</Typography>
          </div>
          <div className='flex h-full flex-1 items-center justify-center'>
            <Typography size='p4'>정산 상태</Typography>
          </div>
          <div className='flex h-full flex-1 items-center justify-center'>
            <Typography size='p4'>정산 금액</Typography>
          </div>
          <div className='flex h-full flex-1 items-center justify-end'>
            <Typography size='p4'>누적 금액</Typography>
          </div>
        </li>

        <Suspense fallback={<SkeletonSettlementList />}>
          <SettlementList />
        </Suspense>
      </div>
    </div>
  );
};

export default SettlementPage;
