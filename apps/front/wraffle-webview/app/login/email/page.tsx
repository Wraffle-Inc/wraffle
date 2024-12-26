'use client';

import type {z} from 'zod';
import Image from 'next/image';
import Link from 'next/link';
import {startTransition} from 'react';
import {GenericForm, Header} from '@/shared/ui';
import {signInWithCredentials} from '@/shared/util/auth/server';
import {loginDefaultValues, loginSchema} from '@/widgets/login/config';
import {EmailForm} from '@/widgets/login/ui';
import {zodResolver} from '@hookform/resolvers/zod';
import {Typography, useToast} from '@wraffle/ui';

const EmailLogin = () => {
  const {toast} = useToast();

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    startTransition(async () => {
      try {
        await signInWithCredentials(data);
      } catch (error) {
        toast({
          title: (error as Error).message,
          duration: 2000,
          variant: 'warning',
          icon: 'close',
        });
      }
    });
  };

  return (
    <div>
      <Header>
        <Header.Left>
          <Header.BackButton />
        </Header.Left>
      </Header>
      <div className='flex h-full flex-col items-center px-5'>
        <Image src='/logo.png' alt='logo' width={136} height={75} priority />
        <section className='mt-7 w-full'>
          <GenericForm
            onSubmit={onSubmit}
            formOptions={{
              mode: 'onChange',
              resolver: zodResolver(loginSchema),
              defaultValues: loginDefaultValues,
            }}
          >
            <EmailForm />
          </GenericForm>
        </section>
        <section className='mt-5 flex gap-[14px]'>
          <Link className='flex items-center' href={'/'}>
            <Typography size='p4' color='zinc500'>
              비밀번호 찾기
            </Typography>
          </Link>
          <p className='text-zinc-500'>|</p>
          <Link className='flex items-center' href={'/join'}>
            <Typography className='text-[13px] text-zinc-500'>
              회원가입
            </Typography>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default EmailLogin;
