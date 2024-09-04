import {cloneElement} from 'react';
import type {ReactElement} from 'react';

interface IconWithLabelProps {
  Icon: React.ReactNode;
  label: string;
  stroke?: string;
  onClick?: () => void;
}

function IconWithLabel({Icon, label, stroke, onClick}: IconWithLabelProps) {
  const IconWithColor = cloneElement(Icon as ReactElement, {
    stroke,
  });

  return (
    <a
      className='flex flex-col items-center gap-1 hover:cursor-pointer hover:text-foreground'
      onClick={onClick}
    >
      {IconWithColor}
      <span className='text-xs' style={stroke ? {color: stroke} : undefined}>
        {label}
      </span>
    </a>
  );
}

export default IconWithLabel;
