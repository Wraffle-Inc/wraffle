'use client';

import {useRouter} from 'next/navigation';
import {Header} from '@/shared/ui';
import {DualInfoBox} from '@/widgets/my-profile/ui/InfoBox';
import {Button, Typography} from '@wraffle/ui';

const SettlementPage = () => {
  const router = useRouter();

  const handleSettlementAccount = () => {
    router.push('/my-profile/settlement/account');
  };

  return (
    <div>
      <Header>
        <Header.Middle>내 정산금 관리</Header.Middle>
      </Header>

      <div className='p-8'>
        <div className='flex'>
          <div>
            <Typography size='h2'>홍길동님</Typography>
            <Typography size='h3'>의 정산</Typography>
          </div>

          <div
            className='ml-auto mt-3 hover:cursor-pointer'
            onClick={handleSettlementAccount}
          >
            <Typography size='p3' color='zinc600'>
              정산계좌 확인
            </Typography>
          </div>
        </div>

        <div className='mt-1'>
          <DualInfoBox
            leftLabel='정산 가능 금액'
            leftValue='31,000원'
            rightLabel='정산 완료 금액'
            rightValue='20,000원'
          />
        </div>

        <div className='mt-6'>
          <Button>정산 요청하기</Button>
        </div>
      </div>
    </div>
  );
};

export default SettlementPage;
