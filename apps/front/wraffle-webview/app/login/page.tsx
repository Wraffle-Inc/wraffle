import Image from 'next/image';
import Link from 'next/link';
import {Button, Typography} from '@wraffle/ui';

const Login = () => {
  return (
    <div className='container flex h-full flex-col items-center py-[78px]'>
      <Image
        src='/logo.png'
        alt='logo'
        width={136}
        height={75}
        className='mt-auto translate-y-1/2 animate-[fade-in-down-half] duration-700'
        priority
      />
      <div className='mt-auto flex w-full flex-col items-center gap-5'>
        <Button className='animate-fade-in-down opacity-0 delay-200 duration-700 fill-mode-forwards'>
          <Typography fontSize='h6'>시작하기</Typography>
        </Button>
        <span className='animate-fade-in-down flex gap-1 opacity-0 delay-500 duration-700 fill-mode-forwards'>
          <Typography fontSize='p4' fontWeight='semibold'>
            이미 계정이 있으신가요?
          </Typography>
          <Link href={'/login/email'}>
            <Typography
              className='text-blue-4'
              fontSize='p4'
              fontWeight='semibold'
            >
              로그인
            </Typography>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
