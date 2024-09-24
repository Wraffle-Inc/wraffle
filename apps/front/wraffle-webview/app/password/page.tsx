'use client';

import {useRouter} from 'next/navigation';
import {Header} from '@/shared/ui/header/core/Header';
import {Button, Input, Typography} from '@wraffle/ui';

function FindPasswordPage() {
  const router = useRouter();

  const handleSendEmail = () => {
    // TODO: 비밀번호 찾기 이메일 발송 API 호출 후, 완료되면 이메일 발송 성공 페이지로 이동
    // router.push('/password/send-success');
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
        <section className='flex-col justify-start'>
          <Typography className='my-5 text-h2'>
            비밀번호 설정을 위해 <br />
            가입한 이메일을 입력해주세요.
          </Typography>

          <Typography className='text-p4'>이메일</Typography>
          <Input className='my-1.5' placeholder='you@example.com' />

          <Typography className='text-xs text-[#6D7684]'>
            *이메일이 수신되지 않거나, 이메일주소가 기억나지 않을 경우
            고객센터로 문의주시기 바랍니다.
          </Typography>
        </section>

        <section className='flex-col justify-end'>
          <div className='flex flex-col items-center py-2'>
            <Typography className='text-sm text-[#6D7684]'>
              고객센터 문의
            </Typography>
          </div>

          <Button onClick={handleSendEmail}>이메일 발송</Button>
        </section>
      </div>
    </div>
  );
}

export default FindPasswordPage;
