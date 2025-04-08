const SkeletonUserInfo = () => {
  return (
    <div className='p-8'>
      <div className='flex'>
        <div className='flex items-center gap-1'>
          <div className='h-8 w-24 animate-pulse rounded-md bg-zinc-200' />
          <div className='h-7 w-16 animate-pulse rounded-md bg-zinc-200' />
        </div>
        <div className='ml-auto mt-3 h-4 w-20 animate-pulse rounded-md bg-zinc-200' />
      </div>

      <div className='mt-1 flex h-[72px] gap-4 rounded-xl bg-[#F9FAFB] p-4'>
        <div className='flex flex-1 flex-col items-center justify-center gap-2'>
          <div className='h-4 w-24 animate-pulse rounded-md bg-zinc-300' />
          <div className='h-6 w-32 animate-pulse rounded-md bg-zinc-300' />
        </div>
        <div className='h-full w-[1px] bg-zinc-200' />
        <div className='flex flex-1 flex-col items-center justify-center gap-2'>
          <div className='h-4 w-24 animate-pulse rounded-md bg-zinc-300' />
          <div className='h-6 w-32 animate-pulse rounded-md bg-zinc-300' />
        </div>
      </div>

      <div className='mt-6'>
        <div className='h-10 w-full animate-pulse rounded-md bg-zinc-200' />
      </div>
    </div>
  );
};

const SkeletonSettlementList = () => {
  return (
    <>
      {Array.from({length: 5}).map((_, index) => (
        <li
          key={`skeleton_${index}`}
          className='flex h-14 items-center justify-between border-b-2 border-b-zinc-100'
        >
          <div className='flex h-full w-20 items-center'>
            <div className='h-4 w-16 animate-pulse rounded-md bg-zinc-200' />
          </div>
          <div className='flex h-full flex-1 items-center justify-center'>
            <div className='h-4 w-16 animate-pulse rounded-md bg-zinc-200' />
          </div>
          <div className='flex h-full flex-1 items-center justify-center'>
            <div className='h-4 w-20 animate-pulse rounded-md bg-zinc-200' />
          </div>
          <div className='flex h-full flex-1 items-center justify-end'>
            <div className='h-4 w-24 animate-pulse rounded-md bg-zinc-200' />
          </div>
        </li>
      ))}
    </>
  );
};

export {SkeletonUserInfo, SkeletonSettlementList};
