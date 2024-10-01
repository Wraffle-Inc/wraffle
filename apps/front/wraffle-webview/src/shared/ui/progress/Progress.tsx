export const ProgressBar = ({
  totalSteps,
  index,
}: {
  totalSteps: number;
  index: number;
}) => {
  const progress = ((index + 1) / totalSteps) * 100;

  return (
    <div className={'h-0.5 w-full bg-[#F4F4F5]'}>
      <div
        style={{
          width: `${progress}%`,
        }}
        className='h-0.5 bg-black transition-[width] duration-300'
      ></div>
    </div>
  );
};
