import {Header} from '@/shared/ui';
import {EditList} from '@/widgets/product-list/edit/ui';
import {Typography} from '@wraffle/ui';

const Edit = ({
  params: {id},
  searchParams: {type},
}: {
  params: {id: string};
  searchParams: {type: 'raffle' | 'event'};
}) => {
  const product = {
    title: 'test Title',
    category: 'category 1',
    tags: ['tag1', 'tag2'],
    images: ['1', '2'],
    price: 999999,
    startDate: new Date(),
    endDate: new Date(),
    announceAt: new Date(),
    winnerCount: 99,
    etc: 'test ETC',
  };

  return (
    <div>
      <div className='py-5'>
        <Header>
          <Header.Left>
            <Header.BackButton></Header.BackButton>
          </Header.Left>
          <Header.Middle>
            <Typography className='text-sm font-semibold text-[#191F28]'>
              래플 수정
            </Typography>
          </Header.Middle>
        </Header>
        <div className='h-px w-full bg-zinc-200'></div>
      </div>

      <EditList product={product} />
    </div>
  );
};

export default Edit;
