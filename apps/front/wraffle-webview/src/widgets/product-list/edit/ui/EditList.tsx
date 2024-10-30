'use client';

import {useFormContext} from 'react-hook-form';
import {Divider} from '@/shared/ui';
import {Button, Icon, Input, Label, Tag} from '@wraffle/ui';

export const EditList = ({product}) => {
  const {watch} = useFormContext();

  const startDate = watch('startDate');
  const endDate = watch('endDate');

  const tags = ['tag1', 'tag2'];

  return (
    <div className='flex h-full flex-col gap-5 px-5 pb-24'>
      <TitleForm placeholder='adsf' />
      <CategoryForm
        defaultValue={product.categoryId}
        categoryItems={[
          {
            value: '1',
            name: '생활',
          },
          {
            value: '2',
            name: '가전-디지탈',
          },
          {
            value: '3',
            name: '행사',
          },
          {
            value: '4',
            name: '당일마감',
          },
        ]}
      />

      <div className='flex flex-col'>
        <Label className='text-xl font-bold text-zinc-900'>태그</Label>
        <div className='mb-2 flex gap-1.5'>
          {tags.map((tag, i) => (
            <Tag key={i}>{tag}</Tag>
          ))}
        </div>
        <div className='relative'>
          <Input
            placeholder='태그명을 입력해주세요.'
            className='border border-solid border-[#F5F5F7] bg-[#FAFAFB] pr-10 text-sm font-medium text-zinc-900 placeholder:text-[#ADB5BD]'
          />
          <button
            className='absolute inset-y-3 right-0 flex items-center pr-4'
            onClick={() => console.log('test')}
          >
            <Icon name='search' />
          </button>
        </div>
      </div>

      <Divider />

      <div>
        <Label className='text-xl font-bold text-zinc-900'>
          이미지*<span className='text-[0.625rem] font-medium'>최대4장</span>
        </Label>
        <div className='flex gap-2'>
          {product.images.map((image, i) => (
            <div
              key={i}
              className='relative h-[7.5rem] w-[7.5rem] rounded-lg bg-blue-100'
            >
              {image}
            </div>
          ))}
        </div>
      </div>

      <Divider />

      <PriceForm />

      <Divider />

      <div>
        <Label className='text-xl font-bold text-zinc-900'>응모 기간*</Label>
        <StartDateForm />
        <EndDateForm fromDate={startDate} />
      </div>

      <Divider />

      <AnnounceAtForm fromDate={endDate} startDate={startDate} />

      <Divider />

      <WinnerCountForm />

      <Divider />

      <EtcForm />

      <div className='fixed inset-x-0 bottom-0 bg-[#F9FAFB] px-4'>
        <Button
          className='mb-5 mt-3 disabled:text-[#A1A1AA]'
          onClick={() => {}}
        >
          수정하기
        </Button>
      </div>
    </div>
  );
};
