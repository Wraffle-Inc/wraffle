'use client';

import {useGetUserInfo} from '@/features/my-profile/api/user';
import {Header} from '@/shared/ui';
import {SingleInfoBox} from '@/widgets/my-profile/ui/InfoBox';
import {Button, Typography} from '@wraffle/ui';

const SettlementAccountPage = () => {
  const {data: userInfoResponse} = useGetUserInfo();
  const nickname = userInfoResponse?.nickname || '';
  const bankName = userInfoResponse?.settlementBankName || '';
  const bankAccount = userInfoResponse?.settlementBankAccount || '';

  const isAccountExist = bankName && bankAccount;

  const title = isAccountExist ? '정산 계좌 수정' : '정산 계좌 등록';

  return (
    <div>
      <Header>
        <Header.Left>
          <Header.BackButton />
        </Header.Left>
        <Header.Middle>
          <Typography size='h4' color='zinc700'>
            {title}
          </Typography>
        </Header.Middle>
      </Header>

      <div className='p-8'>
        <div className='flex'>
          <div>
            <Typography size='h2'>{nickname}님</Typography>
            <Typography size='h3'>의 정산 계좌</Typography>
          </div>
        </div>

        <div className='mt-1'>
          <SingleInfoBox>
            {isAccountExist ? (
              <div className='flex items-center justify-between gap-12'>
                <Typography size='p3'>{bankName}</Typography>
                <Typography size='h3'>{bankAccount}</Typography>
              </div>
            ) : (
              <Typography size='p4'>
                아직 등록된 정산계좌가 없습니다.
              </Typography>
            )}
          </SingleInfoBox>
        </div>

        <div className='mt-6'>
          <Button>{title}하기</Button>
        </div>
      </div>
    </div>
  );
};

export default SettlementAccountPage;
