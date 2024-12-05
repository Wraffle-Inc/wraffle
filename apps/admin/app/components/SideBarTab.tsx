export default function SideBarTab({children}: {children: React.ReactNode}) {
  return (
    <div className='flex flex-row justify-between'>
      <p className='p-2 text-[#4E5968]'>{children}</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src='/chevron-down.svg' alt='chevron-down' />
    </div>
  );
}
