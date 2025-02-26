'use client';

import dayjs from 'dayjs';
import Link from 'next/link';
import {useGetSettlements} from '@/features/my-profile/api/settlement';
import {useGetUserInfo} from '@/features/my-profile/api/user';
import RequestSettlementDialogButton from '@/features/my-profile/ui/RequestSettlementDialogButton';
import {Header} from '@/shared/ui';
import {DualInfoBox} from '@/widgets/my-profile/ui/InfoBox';
import {Typography} from '@wraffle/ui';

const formatPrice = (price: number) => {
  return price.toLocaleString() + '원';
};

const SettlementPage = () => {
  const {data: userInfoResponse} = useGetUserInfo();
  const {data: settlementsResponse} = useGetSettlements();

  const nickname = userInfoResponse?.nickname || '';
  const availableAmount = userInfoResponse?.availableSettlementPrice || 0;

  const settlementList = settlementsResponse?.items || [];

  const settledPrice =
    settlementsResponse?.items[0].settlementAccumulatePrice || 0;

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

      <div className='p-8'>
        <div className='flex'>
          <div className='flex items-center'>
            <Typography size='h2'>{nickname}님</Typography>
            <Typography size='h3'>의 정산</Typography>
          </div>

          <Link href='/my-profile/settlement/account' className='ml-auto mt-3'>
            <Typography size='p3' color='zinc600'>
              정산계좌 확인
            </Typography>
          </Link>
        </div>

        <div className='mt-1'>
          <DualInfoBox
            leftLabel='정산 가능 금액'
            leftValue={formatPrice(availableAmount)}
            rightLabel='정산 완료 금액'
            rightValue={formatPrice(settledPrice)}
          />
        </div>

        <div className='mt-6'>
          <RequestSettlementDialogButton availableAmount={availableAmount} />
        </div>
      </div>

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

        {settlementList.length === 0 ? (
          <div className='flex h-14 items-center justify-center'>
            <Typography size='p3' color='zinc400'>
              정산 내역이 없습니다
            </Typography>
          </div>
        ) : (
          settlementList.map(settlement => (
            <li
              key={`settlementList_${settlement.id}`}
              className='flex h-14 items-center justify-between border-b-2 border-b-zinc-100'
            >
              <div className='flex h-full w-20 items-center'>
                <Typography size='p3' className='font-normal'>
                  {dayjs(settlement.createdAt).format('YYYY.MM.DD')}
                </Typography>
              </div>
              <div className='flex h-full flex-1 items-center justify-center'>
                <Typography size='p3' className='font-normal'>
                  {settlement.status === 'requested'
                    ? '정산 요청'
                    : '정산 완료'}
                </Typography>
              </div>
              <div className='flex h-full flex-1 items-center justify-center text-center'>
                <Typography size='p3' className='font-normal'>
                  {settlement.settlementPrice.toLocaleString()}원
                </Typography>
              </div>
              <div className='flex h-full flex-1 items-center justify-end text-right'>
                <Typography size='p3' className='font-normal'>
                  {settlement.settlementAccumulatePrice.toLocaleString()}원
                </Typography>
              </div>
            </li>
          ))
        )}
      </div>
    </div>
  );
};

export default SettlementPage;
