'use client';

import {useRouter} from 'next/navigation';
import BottomFixedBox from '@/shared/ui/bottom/BottomFixedBox';
import {Header} from '@/shared/ui/header/core/Header';
import {Button, Input, Typography} from '@wraffle/ui';

function ResetPasswordPage() {
  const router = useRouter();

  const handleResetPassword = () => {
    // TODO: 비밀번호 재설정 API 호출 후, 완료되면 로그인 페이지로 이동
  };

  return (
    <div>
      <Header>
        <Header.BackButton onClick={router.back} />
      </Header>

      <div className='container'>
        <div>
          <Typography className='my-5 text-h2'>새로운 비밀번호 입력</Typography>

          <Typography className='text-p4'>새 비밀번호</Typography>
          <Input
            className='my-1.5'
            placeholder='새로운 비밀번호를 입력해주세요.'
          />
        </div>

        <BottomFixedBox>
          <Button onClick={handleResetPassword}>비밀번호 재설정하기</Button>
        </BottomFixedBox>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
