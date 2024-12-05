import {Icon} from '@wraffle/ui';

export default function SideBarTab({children}: {children: React.ReactNode}) {
  return (
    <div className='flex flex-row items-center justify-between'>
      <p className='p-2 text-[#4E5968]'>{children}</p>
      <Icon name='arrow-bottom' stroke='#B0B8C1' width={12} height={12} />
    </div>
  );
}
