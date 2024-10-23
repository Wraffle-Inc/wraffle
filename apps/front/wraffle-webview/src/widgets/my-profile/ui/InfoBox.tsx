import {type ReactNode} from 'react';
import {Icon, Typography} from '@wraffle/ui';

const InfoBox = ({children}: {children: ReactNode}) => {
  return (
    <div className='flex h-24 items-center rounded-lg bg-[#F9FAFB]'>
      {children}
    </div>
  );
};

export const SingleInfoBox = ({children}: {children: ReactNode}) => {
  return (
    <InfoBox>
      <div className='flex w-full items-center justify-center'>{children}</div>
    </InfoBox>
  );
};

interface DualInfoBoxProps {
  leftLabel: string;
  leftValue: string;
  rightLabel: string;
  rightValue: string;
}

export const DualInfoBox = ({
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
}: DualInfoBoxProps) => {
  return (
    <InfoBox>
      <div className='flex flex-1 flex-col items-center'>
        <Typography size='p4'>{leftLabel}</Typography>
        <Typography size='h3'>{leftValue}</Typography>
      </div>

      <Icon name='divider-large' stroke='#E5E8EB' />

      <div className='flex flex-1 flex-col items-center'>
        <Typography size='p4'>{rightLabel}</Typography>
        <Typography size='h3'>{rightValue}</Typography>
      </div>
    </InfoBox>
  );
};
