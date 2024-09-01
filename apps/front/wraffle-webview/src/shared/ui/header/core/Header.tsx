import Image from 'next/image';
import {type ReactNode} from 'react';
import {Icon} from '@wraffle/ui/src/ui/icon/Icon';
import {Typography} from '@wraffle/ui/src/ui/typography/Typography';

interface HeaderProps {
  withBackButton?: boolean;
  children: ReactNode;
}

const HeaderPrimitive = ({children}: HeaderProps) => {
  return (
    <div className='flex h-[52px] items-center justify-between px-5'>
      {children}
    </div>
  );
};

type WithChildren = {
  children: ReactNode;
};

const Left = ({children}: WithChildren) => {
  return <div className='flex flex-1 items-center gap-4'>{children}</div>;
};

const Middle = ({children}: WithChildren) => {
  return <div className='flex flex-1 items-center gap-4'>{children}</div>;
};

const Right = ({children}: WithChildren) => {
  return <div className='flex flex-1 items-center gap-4'>{children}</div>;
};

interface BackButtonProps {
  onClick: () => void;
}

const BackButton = ({onClick}: BackButtonProps) => {
  return (
    <button
      onClick={onClick}
      className='flex items-center justify-center text-black'
    >
      <Icon name='arrow-left' showBadge />
    </button>
  );
};

const Logo = () => {
  return (
    <div className='flex items-center justify-center'>
      <Image src='/logo.png' alt='logo' width={100} height={100} />
    </div>
  );
};

interface TitleProps {
  children: string;
}

const Title = ({children}: TitleProps) => {
  return <Typography fontSize='h1'>{children}</Typography>;
};

HeaderPrimitive.Left = Left;
HeaderPrimitive.Middle = Middle;
HeaderPrimitive.Right = Right;
HeaderPrimitive.BackButton = BackButton;
HeaderPrimitive.Logo = Logo;
HeaderPrimitive.Title = Title;

export {HeaderPrimitive as Header};
