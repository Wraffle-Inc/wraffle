import {DualInfoBox} from './InfoBox';
import Link from 'next/link';
import {useGetSettlements} from '@/features/my-profile/api/settlement';
import {useGetUserInfo} from '@/features/my-profile/api/user';
import RequestSettlementDialogButton from '@/features/my-profile/ui/RequestSettlementDialogButton';
import {Typography} from '@wraffle/ui';

const formatPrice = (price: number) => {
  return price.toLocaleString() + '원';
};

export const UserSettlementInfo = () => {
  const {data: userInfoResponse} = useGetUserInfo();
  const {data: settlementsResponse} = useGetSettlements();

  const nickname = userInfoResponse?.nickname || '';
  const availableAmount = userInfoResponse?.availableSettlementPrice || 0;

  const settledPrice =
    settlementsResponse.items[0].settlementAccumulatePrice || 0;

  return (
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
  );
};
