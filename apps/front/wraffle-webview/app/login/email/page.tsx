'use client';

import type {z} from 'zod';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';
import {loginSchema, type LoginPayload} from '@/entities/auth';
import {Header, RHFInput, Form} from '@/shared/ui';
import {getDefaults} from '@/shared/util';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button, Typography} from '@wraffle/ui';

const EmailLogin = () => {
  const router = useRouter();
  const form = useForm<LoginPayload>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
    defaultValues: getDefaults(loginSchema),
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    //!TODO: 로그인 로직 구현
    console.log(data.email, data.password);
  };

  return (
    <div>
      <Header>
        <Header.BackButton onClick={router.back} />
      </Header>
      <div className='flex h-full flex-col items-center px-5'>
        <Image src='/logo.png' alt='logo' width={136} height={75} priority />
        <section className='mt-7 w-full'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <RHFInput
                name='email'
                label='이메일*'
                placeholder='이메일을 입력해주세요.'
              />
              <RHFInput
                type='password'
                name='password'
                label='비밀번호*'
                placeholder='비밀번호를 입력해주세요.'
              />
              <Button
                className='mt-10 text-[15px]'
                type='submit'
                disabled={!form.formState.isValid}
              >
                로그인
              </Button>
            </form>
          </Form>
        </section>
        <section className='mt-5 flex gap-[14px]'>
          <Link className='flex items-center' href={'/'}>
            <Typography className='text-[13px] text-zinc-500'>
              비밀번호 찾기
            </Typography>
          </Link>
          <p className='text-zinc-500'>|</p>
          <Link className='flex items-center' href={'/'}>
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
