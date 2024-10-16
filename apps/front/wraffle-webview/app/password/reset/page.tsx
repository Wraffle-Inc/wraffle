'use client';

import {useResetPassword} from 'features/password/api/password';
import {useRouter, useSearchParams} from 'next/navigation';
import {useForm} from 'react-hook-form';
import {type PasswordPayload, passwordObjectSchema} from '@/entities/auth';
import {Form, RHFInput} from '@/shared/ui';
import BottomFixedBox from '@/shared/ui/bottom/BottomFixedBox';
import {Header} from '@/shared/ui/header/core/Header';
import {getDefaults} from '@/shared/util';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button, Toaster, Typography, useToast} from '@wraffle/ui';

const ResetPasswordPage = () => {
  const router = useRouter();
  const {toast} = useToast();
  const requestResetPassword = useResetPassword();

  const params = useSearchParams();
  const code = params.get('code') || '';
  const email = params.get('email') || '';

  const form = useForm<PasswordPayload>({
    resolver: zodResolver(passwordObjectSchema),
    defaultValues: getDefaults(passwordObjectSchema),
  });

  const onSubmit = (data: PasswordPayload) => {
    requestResetPassword(
      {
        code,
        email,
        resetPassword: data.password,
      },
      {
        onSuccess: () => {
          toast({
            title: '비밀번호 변경이 완료되었습니다.',
            duration: 2000,
            variant: 'success',
            icon: 'check',
          });

          setTimeout(() => {
            router.push('/login');
          }, 2000);
        },
        onError: (error: Error) => {
          toast({
            title: error.message,
            duration: 2000,
            variant: 'warning',
            icon: 'close',
          });
        },
      },
    );
  };

  const isFormEmpty = !form.watch('password');

  return (
    <div>
      <Toaster />
      <Header>
        <Header.BackButton onClick={router.back} />
      </Header>

      <Form {...form}>
        <form className='px-5' onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <Typography className='my-5 text-h2'>
              새로운 비밀번호 입력
            </Typography>

            <RHFInput
              name='password'
              type='password'
              label='새 비밀번호'
              placeholder='새로운 비밀번호를 입력해주세요.'
            />
          </div>

          <BottomFixedBox>
            <Button type='submit' disabled={isFormEmpty}>
              비밀번호 재설정하기
            </Button>
          </BottomFixedBox>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordPage;
