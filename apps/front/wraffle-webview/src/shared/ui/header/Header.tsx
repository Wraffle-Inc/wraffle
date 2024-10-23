import {BackButton} from './core/BackButton';
import {Logo} from './core/Logo';
import {Title} from './core/Title';
import {type ReactNode} from 'react';
import {findComponentFromChildren} from '@wraffle/ui';

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

HeaderPrimitive.Left = Left;
HeaderPrimitive.Middle = Middle;
HeaderPrimitive.Right = Right;
HeaderPrimitive.BackButton = BackButton;
HeaderPrimitive.Logo = Logo;
HeaderPrimitive.Title = Title;

export {HeaderPrimitive as Header};
