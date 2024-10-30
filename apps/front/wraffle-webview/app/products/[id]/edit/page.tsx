'use client';

import {Header} from '@/shared/ui';
import GenericForm from '@/shared/ui/form/GenericForm';
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

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <div>
      <div className='py-5'>
        <Header>
          <Header.Left>
            <Header.BackButton />
          </Header.Left>
          <Header.Middle>
            <Typography className='text-sm font-semibold text-[#191F28]'>
              래플 수정
            </Typography>
          </Header.Middle>
        </Header>
        <div className='h-px w-full bg-zinc-200'></div>
      </div>

      <GenericForm onSubmit={onSubmit} formOptions={{defaultValues: product}}>
        <EditList product={product} />
      </GenericForm>
    </div>
  );
};

export default Edit;
