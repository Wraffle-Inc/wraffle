'use client';

import {
  createRaffleSchema,
  type CreateRafflePayload,
} from '@/entities/product/model';
import {Header} from '@/shared/ui';
import GenericForm from '@/shared/ui/form/GenericForm';
import {EditList} from '@/widgets/product-list/edit/ui';
import {zodResolver} from '@hookform/resolvers/zod';
import {Typography} from '@wraffle/ui';

// 조회 api 연결시 삭제할 코드 입니다
const product = {
  title: 'test Title',
  categoryId: '1',
  tagIds: [1, 2],
  images: ['/1', '/2', '/3'],
  price: '999999',
  startDate: new Date(),
  endDate: new Date(),
  announceAt: new Date(),
  winnerCount: '99',
  etc: 'test ETC',
};

const Edit = ({
  params: {id},
  searchParams: {type},
}: {
  params: {id: string};
  searchParams: {type: 'raffle' | 'event'};
}) => {
  const onSubmit = (data: CreateRafflePayload) => {
    console.log(data);
  };

  return (
    <div>
      <div className='my-5'>
        <Header withUnderline>
          <Header.Left>
            <Header.BackButton />
          </Header.Left>
          <Header.Middle>
            <Typography className='text-sm font-semibold text-[#191F28]'>
              래플 수정
            </Typography>
          </Header.Middle>
        </Header>
      </div>

      <GenericForm
        onSubmit={onSubmit}
        formOptions={{
          mode: 'onSubmit',
          resolver: zodResolver(createRaffleSchema),
          defaultValues: product,
        }}
      >
        <EditList type={type} />
      </GenericForm>
    </div>
  );
};

export default Edit;
