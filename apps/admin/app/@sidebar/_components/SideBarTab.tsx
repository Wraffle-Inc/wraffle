'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Icon} from '@wraffle/ui';

export default function SideBarTab({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const path = usePathname();
  const isActive = href === path;
  return (
    <Link href={href}>
      <div className='group flex flex-row items-center justify-between'>
        <p
          className={
            isActive ? 'p-2 font-bold text-[#4E5968]' : 'p-2 text-[#4E5968]'
          }
        >
          {children}
        </p>
        <Icon
          name='arrow-right'
          stroke='#B0B8C1'
          width={12}
          height={12}
          className={`transition-opacity duration-300 ${
            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        />
      </div>
    </Link>
  );
}
`p-2 text-[#4E5968]`;
