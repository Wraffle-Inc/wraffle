'use client';

import {useFormContext, useWatch} from 'react-hook-form';
import type {CreateEventPayload} from '@/entities/product/model';
import {EtcForm} from '@/features/product-form/ui';
import {Button, Typography} from '@wraffle/ui';

export const EtcStep = () => {
  const {control} = useFormContext<CreateEventPayload>();
  const etc = useWatch({control, name: 'etc'});

  return (
    <div className='flex h-full flex-col px-5 pb-20'>
      <div className='mb-5'>
        <Typography as='h2' size='h2'>
          마지막으로 유의사항 한마디.
        </Typography>
        <Typography as='p' size='p3' color='zinc400'>
          유의사항은 400자까지 작성이 가능해요!
        </Typography>
      </div>

      <EtcForm defaultValue={etc} />

      <div className='fixed inset-x-0 bottom-0 bg-white px-4'>
        <Button
          type='submit'
          disabled={!etc}
          className='mb-5 mt-3 disabled:text-[#A1A1AA]'
        >
          생성 요청하기
        </Button>
      </div>
    </div>
  );
};
