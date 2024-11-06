import Image from 'next/image';

export const Logo = () => {
  return (
    <div className='flex items-center justify-center'>
      <Image src='/logo.png' alt='logo' width={68} height={38} />
    </div>
  );
};
