'use client';

import {useDateValidationWithToast} from '../../lib/hooks';
import {useEffect} from 'react';
import {useFormContext, useWatch} from 'react-hook-form';
import type {CreateRafflePayload} from '@/entities/product/model';
import {AddItemCard, ImageCardWithDelete} from '@/features/image-handle';
import {
  AnnounceAtForm,
  CategoryForm,
  EndDateForm,
  EtcForm,
  PriceForm,
  StartDateForm,
  TitleForm,
  WinnerCountForm,
} from '@/features/product-form/ui';
import {Divider} from '@/shared/ui';
import {getTypeText} from '@/shared/util';
import {Button, Icon, Input, Label, Tag, Toaster} from '@wraffle/ui';

// tag api 연동할 때 삭제될 코드 입니다
const tags = ['tasdfasg1', 'tag2', 'tasdfasdfag1333', 'tasdfasdfag1333'];

/**
 * images와 tags 부분은 조회 api 연동하며 수정될 임시 코드 입니다.
 */
export const EditList = ({type}: {type: 'raffle' | 'event'}) => {
  const eventOrRaffleText = getTypeText(type);
  const {control, setValue} = useFormContext<CreateRafflePayload>();

  const [
    title,
    categoryId,
    price,
    startDate,
    endDate,
    announceAt,
    winnerCount,
    images,
    etc,
  ] = useWatch({
    control,
    name: [
      'title',
      'categoryId',
      'price',
      'startDate',
      'endDate',
      'announceAt',
      'winnerCount',
      'images',
      'etc',
    ],
  });

  const disabled =
    !title ||
    !categoryId ||
    !price ||
    !startDate ||
    !endDate ||
    !announceAt ||
    !winnerCount ||
    !etc;

  useDateValidationWithToast({startDate, endDate, announceAt});

  useEffect(() => {
    if (endDate < startDate) {
      setValue('endDate', startDate);
    }
    if (announceAt < endDate) {
      setValue('announceAt', endDate);
    }
  }, [startDate, endDate]);

  return (
    <div className='flex h-full flex-col gap-5 px-5 pb-24'>
      <div className='fixed top-5 z-10'>
        <Toaster />
      </div>

      <TitleForm
        defaultValue={title}
        placeholder={eventOrRaffleText.titlePlaceholder}
      />

      <CategoryForm
        defaultValue={categoryId}
        // category 조회 api 연동 후 수정될 코드 입니다
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

      <div>
        <Label className='text-xl font-bold text-zinc-900'>태그</Label>
        <div className='mb-2 flex gap-1.5 overflow-x-scroll'>
          {tags.map((tag, i) => (
            <Tag key={i}>{tag}</Tag>
          ))}
        </div>
        <div className='relative'>
          <Input
            placeholder='태그명을 입력해주세요.'
            className='border border-solid border-[#F5F5F7] bg-[#FAFAFB] pr-10 text-sm font-medium text-zinc-900 placeholder:text-[#ADB5BD]'
          />
          <button className='absolute inset-y-3 right-0 flex items-center pr-4'>
            <Icon name='search' />
          </button>
        </div>
      </div>

      <Divider />

      <div>
        <Label className='text-xl font-bold text-zinc-900'>
          이미지*<span className='text-[0.625rem] font-medium'>최대4장</span>
        </Label>
        <div className='flex gap-2 overflow-x-scroll'>
          {images.length < 4 && (
            <AddItemCard
              label='이미지 추가'
              onClick={() => {}}
              className='h-[7.5rem] w-[7.5rem]'
            />
          )}
          {images.map(image => (
            <ImageCardWithDelete
              key={image}
              url={'/'}
              onClick={() => {}}
              className='h-[7.5rem] w-[7.5rem]'
            />
          ))}
        </div>
      </div>

      <Divider />

      <PriceForm
        defaultValue={price}
        label={eventOrRaffleText.priceLabel}
        placeholder={eventOrRaffleText.pricePlaceholder}
      />

      <Divider />

      <div>
        <Label className='text-xl font-bold text-zinc-900'>응모 기간*</Label>
        <StartDateForm defaultValue={startDate} />
        <div className='h-2.5'></div>
        <EndDateForm defaultValue={endDate} fromDate={startDate} />
      </div>

      <Divider />

      <AnnounceAtForm
        defaultValue={announceAt}
        fromDate={endDate}
        startDate={startDate}
      />

      <Divider />

      <WinnerCountForm defaultValue={winnerCount} />

      <Divider />

      <EtcForm defaultValue={etc} />

      <div className='fixed inset-x-0 bottom-0 bg-[#F9FAFB] px-4'>
        <Button
          type='submit'
          disabled={disabled}
          className='mb-5 mt-3 disabled:text-[#A1A1AA]'
          onClick={() => {}}
        >
          수정하기
        </Button>
      </div>
    </div>
  );
};
