'use client';

import {useSendEmail} from 'features/password/api/password';
import {useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';
import {type EmailPayload, emailObjectSchema} from '@/entities/auth';
import {Form, RHFInput} from '@/shared/ui';
import BottomFixedBox from '@/shared/ui/bottom/BottomFixedBox';
import {Header} from '@/shared/ui/header/core/Header';
import {getDefaults} from '@/shared/util';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button, Typography} from '@wraffle/ui';

const FindPasswordPage = () => {
  const router = useRouter();
  const requestSendEmail = useSendEmail();

  const form = useForm<EmailPayload>({
    resolver: zodResolver(emailObjectSchema),
    defaultValues: getDefaults(emailObjectSchema),
  });

  const onSubmit = (data: EmailPayload) => {
    requestSendEmail(data.email, {
      onSuccess: () => {
        router.push('/password/send-success');
      },
      onError: (error: Error) => {
        console.error(error.message);
      },
    });
  };

  const isFormEmpty = !form.watch('email');

  return (
    <div>
      <Header>
        <Header.BackButton onClick={router.back} />
        <Header.Middle>비밀번호 찾기</Header.Middle>
      </Header>

      <Form {...form}>
        <form className='px-5' onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <Typography className='my-5 text-h2'>
              비밀번호 설정을 위해 <br />
              가입한 이메일을 입력해주세요.
            </Typography>

            <RHFInput
              name='email'
              label='이메일'
              placeholder='you@example.com'
            />

            <Typography className='text-xs text-[#6D7684]'>
              *이메일이 수신되지 않거나, 이메일주소가 기억나지 않을 경우
              고객센터로 문의주시기 바랍니다.
            </Typography>
          </div>

          <BottomFixedBox>
            <div className='flex flex-col items-center py-2'>
              <Typography className='text-sm text-[#6D7684]'>
                고객센터 문의
              </Typography>
            </div>

            <Button type='submit' disabled={isFormEmpty}>
              이메일 발송
            </Button>
          </BottomFixedBox>
        </form>
      </Form>
    </div>
  );
};

export default FindPasswordPage;
