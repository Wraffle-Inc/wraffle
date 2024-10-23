import {Header} from '@/shared/ui';
import {SingleInfoBox} from '@/widgets/my-profile/ui/InfoBox';
import {Button, Typography} from '@wraffle/ui';

const SettlementAccountPage = () => {
  const isAccountExist = true;

  const title = isAccountExist ? '정산 계좌 수정' : '정산 계좌 등록';

  return (
    <div>
      <Header>
        <Header.Middle>{title}</Header.Middle>
      </Header>

      <div className='flex flex-col p-8'>
        <div className='flex'>
          <div>
            <Typography size='h2'>홍길동님</Typography>
            <Typography size='h3'>의 정산 계좌</Typography>
          </div>
        </div>

        <div className='mt-1'>
          <SingleInfoBox>
            {isAccountExist ? (
              <div className='flex items-center justify-between gap-12'>
                <Typography size='p3'>신한은행</Typography>
                <Typography size='h3'>123-12312-123</Typography>
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
