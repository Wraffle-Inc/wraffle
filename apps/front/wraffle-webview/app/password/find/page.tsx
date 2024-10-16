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
import {Button, Toaster, Typography, useToast} from '@wraffle/ui';

const FindPasswordPage = () => {
  const router = useRouter();
  const {toast} = useToast();
  const requestSendEmail = useSendEmail();

  const form = useForm<EmailPayload>({
    resolver: zodResolver(emailObjectSchema),
    defaultValues: getDefaults(emailObjectSchema),
  });

  const handleContactCustomerCenter = () => {
    // TODO: 추후 작업할 예정 (고객센터 링크 추가하기)
  };

  const onSubmit = (data: EmailPayload) => {
    requestSendEmail(data.email, {
      onSuccess: () => {
        router.push('/password/sent');
      },
      onError: (error: Error) => {
        toast({
          title: error.message,
          duration: 2000,
          variant: 'warning',
          icon: 'close',
        });
      },
    });
  };

  const isFormEmpty = !form.watch('email');

  return (
    <div>
      <Toaster />
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
            <div
              className='flex flex-col items-center py-2'
              onClick={handleContactCustomerCenter}
            >
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
