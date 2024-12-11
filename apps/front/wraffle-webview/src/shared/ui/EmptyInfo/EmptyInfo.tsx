import Link from 'next/link';
import {Typography} from '@wraffle/ui';

export const EmptyInfo = ({
  description,
  href,
  linkLabel,
}: {
  description: string;
  href: string;
  linkLabel: string;
}) => (
  <div className='flex h-full w-full flex-col items-center justify-center gap-9 pt-28'>
    <Typography as='p' size='p1' color='zinc400'>
      {description}
    </Typography>
    <Link
      href={href}
      className='flex items-center rounded-lg bg-black px-6 py-2 text-sm text-white'
    >
      <Typography as='p' size='p3' color='white'>
        {linkLabel}
      </Typography>
    </Link>
  </div>
);
