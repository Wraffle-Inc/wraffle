export const TitleStepSkeleton = () => {
  return (
    <div className='flex h-full flex-col gap-5 px-5 pb-20'>
      <div>
        <div className='h-8 w-48 animate-pulse rounded bg-zinc-200' />
        <div className='mt-2 h-4 w-32 animate-pulse rounded bg-zinc-200' />
      </div>

      <div className='space-y-2'>
        <div className='h-4 w-20 animate-pulse rounded bg-zinc-200' />
        <div className='h-10 w-full animate-pulse rounded bg-zinc-200' />
      </div>

      <div className='space-y-2'>
        <div className='h-4 w-20 animate-pulse rounded bg-zinc-200' />
        <div className='h-10 w-full animate-pulse rounded bg-zinc-200' />
      </div>

      <div className='space-y-2'>
        <div className='h-4 w-20 animate-pulse rounded bg-zinc-200' />
        <div className='flex flex-wrap gap-2'>
          {Array.from({length: 4}).map((_, index) => (
            <div
              key={index}
              className='h-8 w-20 animate-pulse rounded bg-zinc-200'
            />
          ))}
        </div>
      </div>

      <div className='space-y-2'>
        <div className='h-4 w-20 animate-pulse rounded bg-zinc-200' />
        <div className='h-10 w-full animate-pulse rounded bg-zinc-200' />
      </div>

      <div className='fixed inset-x-0 bottom-0 bg-white px-4'>
        <div className='mb-5 mt-3 h-10 w-full animate-pulse rounded bg-zinc-200' />
      </div>
    </div>
  );
};
