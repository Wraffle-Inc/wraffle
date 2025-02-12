import {Icon, Typography} from '@wraffle/ui';

const AddCard = () => {
  return (
    <div className='flex h-40 w-72 cursor-pointer items-center justify-center rounded-3xl border border-[#DDE2E6] bg-[#F2F4F6] hover:opacity-80'>
      <div className='flex flex-col items-center justify-center gap-6'>
        <Icon name='plus' width={28} height={28} color='#71717A' />
        <Typography size='h5' color='zinc500'>
          카드 추가하기
        </Typography>
      </div>
    </div>
  );
};

export {AddCard};
