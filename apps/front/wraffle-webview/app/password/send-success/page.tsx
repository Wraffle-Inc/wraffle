'use client';

import {useRouter} from 'next/navigation';
import {Header} from '@/shared/ui/header/core/Header';
import {Button, Typography} from '@wraffle/ui';

function SendEmailSuccessPage() {
  const router = useRouter();

  const handleResendEmail = () => {
    // TODO: 이메일 재발송 API 호출
    // router.push('/password');
  };

  const handleGoHome = () => {
    // TODO: 홈(로그인 페이지)으로 이동
  };

  return (
    <div>
      <Header>
        <Header.BackButton onClick={router.back} />
        <Header.Middle>비밀번호 찾기</Header.Middle>
      </Header>
      <div
        className='container flex flex-col justify-between'
        style={{height: 'calc(100dvh - 60px)'}}
      >
        <section className='mt-5 flex flex-col justify-start gap-5'>
          <Typography className='text-h2'>
            비밀번호 재설정 <br />
            이메일을 보냈습니다.
          </Typography>

          <Typography className='text-sm text-[#8D95A1]'>
            받은편지함을 확인해 주세요. 이메일이 오지 않으면, 스팸 메일함을
            확인해 주시거나 아래 버튼을 눌러 이메일을 다시 보내주세요.
          </Typography>
        </section>

        <section className='flex flex-col justify-end gap-3'>
          <Button variant='stroke' onClick={handleResendEmail}>
            다시 보내기
          </Button>
          <Button onClick={handleGoHome}>홈으로 가기</Button>
        </section>
      </div>
    </div>
  );
}

export default SendEmailSuccessPage;
