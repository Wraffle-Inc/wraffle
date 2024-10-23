import Image from 'next/image';
import {type ReactNode} from 'react';
import {findComponentFromChildren} from '@wraffle/ui';
import {Icon} from '@wraffle/ui/src/ui/icon/Icon';
import type {TypographyProps} from '@wraffle/ui/src/ui/typography/Typography';
import {Typography} from '@wraffle/ui/src/ui/typography/Typography';

interface HeaderProps {
  withBackButton?: boolean;
  children: ReactNode;
}

const HeaderPrimitive = ({children}: HeaderProps) => {
  const leftComponent = findComponentFromChildren(children, Left);
  const middleComponent = findComponentFromChildren(children, Middle);
  const rightComponent = findComponentFromChildren(children, Right);
  return (
    <div className='flex h-[52px] items-center justify-between px-5'>
      <div className='flex flex-1 items-center gap-4'>{leftComponent}</div>
      {!!middleComponent && (
        <div className='flex flex-1 items-center justify-center gap-4'>
          {middleComponent}
        </div>
      )}
      <div className='flex flex-1 items-center gap-4'>{rightComponent}</div>
    </div>
  );
};

type WithChildren = {
  children: ReactNode;
};

const Left = ({children}: WithChildren) => {
  return <>{children}</>;
};

const Middle = ({children}: WithChildren) => {
  return <>{children}</>;
};

const Right = ({children}: WithChildren) => {
  return <>{children}</>;
};

interface BackButtonProps {
  onClick?: () => void;
}

const BackButton = ({onClick}: BackButtonProps) => {
  return (
    <button
      onClick={onClick}
      className='flex items-center justify-center text-black'
    >
      <Icon name='arrow-left' />
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

interface TitleProps extends TypographyProps {
  children: string;
}

const Title = ({children, size = 'h4', ...props}: TitleProps) => {
  return (
    <Typography size={size} {...props}>
      {children}
    </Typography>
  );
};

HeaderPrimitive.Left = Left;
HeaderPrimitive.Middle = Middle;
HeaderPrimitive.Right = Right;
HeaderPrimitive.BackButton = BackButton;
HeaderPrimitive.Logo = Logo;
HeaderPrimitive.Title = Title;

export {HeaderPrimitive as Header};
