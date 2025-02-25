const SkeletonNotificationItem = () => (
  <div className='flex min-h-[70px] w-full animate-pulse flex-row items-center justify-between gap-[10px] px-5 py-1'>
    <div className='flex w-full flex-col justify-between'>
      <div className='flex flex-col items-start'>
        <div className='mb-2 h-4 w-3/4 rounded bg-gray-300'></div>
        <div className='h-3 w-full rounded bg-gray-300'></div>
        <div className='mt-1 h-3 w-5/6 rounded bg-gray-300'></div>
      </div>
      <div className='mt-2 h-3 w-1/4 rounded bg-gray-300'></div>
    </div>
    <div className='relative h-[60px] w-[60px] rounded-md bg-gray-300'></div>
  </div>
);

const SkeletonNotificationList = () => {
  return (
    <div className='flex flex-col divide-y divide-[#E0E0E0]'>
      {Array.from({length: 8}).map((_, index) => (
        <SkeletonNotificationItem key={index} />
      ))}
    </div>
  );
};

export {SkeletonNotificationList};
