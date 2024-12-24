'use client';

import {DateSection} from '../../date/DateSection';
import {useFormContext, useWatch} from 'react-hook-form';
import type {CreateRafflePayload} from '@/entities/product/model';
import {AddItemCard, ImageCardWithDelete} from '@/features/image-handle';
import {
  CategoryForm,
  EtcForm,
  PriceForm,
  TitleForm,
  WinnerCountForm,
} from '@/features/product-form/ui';
import {Divider} from '@/shared/ui';
import {InputWithSearchIcon} from '@/shared/ui/input/InputWithSearchIcon';
import {Tags} from '@/shared/ui/tag/Tags';
import {getTypeText} from '@/shared/util';
import {Button, Icon, Input, Label, Tag} from '@wraffle/ui';

// tag api 연동할 때 삭제될 코드 입니다
const tags = ['tasdfasg1', 'tag2', 'tasdfasdfag1333', 'tasdfasdfag1333'];
// category 조회 api 연동 후 수정될 코드 입니다
const categoryItems = [
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
];
interface EditListProps {
  type: 'raffle' | 'event';
}

export const EditList = ({type}: EditListProps) => {
  const eventOrRaffleText = getTypeText(type);
  const {control} = useFormContext<CreateRafflePayload>();

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

  return (
    <div className='flex h-full flex-col gap-5 px-5 pb-24'>
      <TitleForm
        defaultValue={title}
        placeholder={eventOrRaffleText.titlePlaceholder}
      />

      <CategoryForm defaultValue={categoryId} categoryItems={categoryItems} />

      {/* 조회 api 연동시 수정 */}
      <div>
        <Label className='text-xl font-bold text-zinc-900'>태그</Label>
        <Tags tags={tags} className='mb-2 overflow-x-scroll' />
        <InputWithSearchIcon
          placeholder='태그명을 입력해주세요.'
          onClick={() => {}}
        />
      </div>

      <Divider />

      {/* 조회 API 연동시 수정 */}
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

      <DateSection
        startDate={startDate}
        endDate={endDate}
        announceAt={announceAt}
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
