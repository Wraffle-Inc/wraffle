const SkeletonCardList = () => {
  return (
    <div>
      {[...Array(3)].map((_, index) => (
        <SkeletonCardItem key={index} showDefaultLabel={index === 0} />
      ))}
    </div>
  );
};

export {SkeletonCardList};

interface SkeletonCardItemProps {
  showDefaultLabel?: boolean;
}

const SkeletonCardItem = ({
  showDefaultLabel = false,
}: SkeletonCardItemProps) => {
  return (
    <div className='w-full animate-pulse py-3'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-center'>
          <div className='mr-2 h-4 w-4 rounded-full bg-gray-300' />
          <div className='flex items-center gap-2'>
            <div className='aspect-[1.58/1] h-10 w-16 rounded bg-gray-300' />
            <span className='flex items-center gap-2'>
              <div className='h-4 w-36 rounded bg-gray-300' />
            </span>
          </div>
        </div>
        {showDefaultLabel && <div className='h-6 w-16 rounded bg-gray-300' />}
      </div>
    </div>
  );
};
