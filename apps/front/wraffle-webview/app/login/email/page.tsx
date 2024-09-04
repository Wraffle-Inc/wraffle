'use client';

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
  return (
    <div className='h-full'>
      <Header>
        <Header.BackButton onClick={router.back} />
      </Header>
      <div className='container flex h-full flex-col items-center'>
        <Image src='/logo.png' alt='logo' width={136} height={75} priority />
        <section className='mt-7 w-full'>
          <Form {...form}>
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
            <Button className='mt-10' type='submit'>
              로그인
            </Button>
          </Form>
        </section>
        <section className='mt-5 flex gap-[14px]'>
          <Link href={'/'}>
            <Typography className='font-medium text-zinc-500' fontSize='p4'>
              비밀번호 찾기
            </Typography>
          </Link>
          <p className='text-zinc-500'>|</p>
          <Link href={'/'}>
            <Typography className='font-medium text-zinc-500' fontSize='p4'>
              회원가입
            </Typography>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default EmailLogin;
