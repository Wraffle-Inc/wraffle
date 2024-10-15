'use client';

import type {z} from 'zod';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import type {LoginPayload} from '@/entities/auth';
import {loginDefaultValues, loginSchema} from '@/entities/auth';
import {Header} from '@/shared/ui';
import GenericForm from '@/shared/ui/form/GenericForm';
import {EmailForm} from '@/widgets/login/EmailForm';
import {zodResolver} from '@hookform/resolvers/zod';
import {Typography} from '@wraffle/ui';

const EmailLogin = () => {
  const router = useRouter();

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
          <GenericForm<LoginPayload>
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
            <Typography className='text-[13px] text-zinc-500'>
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
