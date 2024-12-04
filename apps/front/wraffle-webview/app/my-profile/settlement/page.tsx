'use client';

import Link from 'next/link';
import {useGetUserInfo} from '@/features/my-profile/api/user';
import {Header} from '@/shared/ui';
import {DualInfoBox} from '@/widgets/my-profile/ui/InfoBox';
import {Button, Typography} from '@wraffle/ui';

const SettlementPage = () => {
  const {data: userInfoResponse} = useGetUserInfo();
  const nickname = userInfoResponse?.nickname || '';

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
          <div>
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
