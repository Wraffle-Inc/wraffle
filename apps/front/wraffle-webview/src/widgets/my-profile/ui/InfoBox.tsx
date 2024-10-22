import {Icon, Typography} from '@wraffle/ui';

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
    <div className='flex h-24 items-center rounded-lg bg-[#F9FAFB]'>
      <div className='flex flex-1 flex-col items-center'>
        <Typography size='p4'>{leftLabel}</Typography>
        <Typography size='h3' className='font-bold'>
          {leftValue}
        </Typography>
      </div>

      <Icon name='divider-large' stroke='#E5E8EB' />

      <div className='flex flex-1 flex-col items-center'>
        <Typography size='p4'>{rightLabel}</Typography>
        <Typography size='h3' className='font-bold'>
          {rightValue}
        </Typography>
      </div>
    </div>
  );
};

export const SingleInfoBox = () => {};
