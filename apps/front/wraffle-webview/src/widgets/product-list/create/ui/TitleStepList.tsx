'use client';

import {useFormContext, useWatch} from 'react-hook-form';
import type {CreateEventPayload} from '@/entities/product/model';
import {CategoryForm, PriceForm, TitleForm} from '@/features/product-form/ui';
import {getTypeText, TAG_LIMIT} from '@/shared/util';
import {Button, Icon, Input, Label, Tag, Typography} from '@wraffle/ui';

// TODO
// 카테고리 api 연동
// tag api 연동
export const TitleStep = ({
  type,
  onNext,
}: {
  type: 'raffle' | 'event';
  onNext: (
    title: string,
    category: string,
    tagIds: number[],
    price: string,
  ) => void;
}) => {
  const eventOrRaffleText = getTypeText(type);

  const {control} = useFormContext<CreateEventPayload>();

  const [title, category, tagIds, price] = useWatch({
    control,
    name: ['title', 'categoryId', 'tagIds', 'price'],
  });

  const idDisabled = !title || !category || !price;

  // api 연동 후 삭제될 코드 입니다. categoryItems, tags
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

  const tags = ['tag1', 'tag2'];

  return (
    <div className='flex h-full flex-col gap-5 px-5 pb-20'>
      <div>
        <Typography as='h2' size='h2'>
          {eventOrRaffleText.titleStep}
        </Typography>
        <Typography as='p' size='p3' color='zinc400'>
          기본 정보를 입력해주세요.
        </Typography>
      </div>

      <TitleForm
        defaultValue={title}
        placeholder={eventOrRaffleText.titlePlaceholder}
      />

      <PriceForm
        label={eventOrRaffleText.priceLabel}
        placeholder={eventOrRaffleText.pricePlaceholder}
        defaultValue={price}
      />

      <CategoryForm defaultValue={category} categoryItems={categoryItems} />

      <div className='flex flex-col'>
        <Label className='text-xl font-bold'>태그</Label>
        <div className='relative'>
          <Input
            className='border-[#F5F5F7] bg-[#FAFAFB] pr-10 placeholder:text-[#ADB5BD]'
            placeholder='태그명을 입력해주세요. (최대 5개)'
            maxLength={TAG_LIMIT}
            disabled={tags.length === 5} // 태그 조회 api 연동하며 작업 예정
          />
          <button className='absolute inset-y-3 right-0 flex items-center pr-4'>
            <Icon name='search' />
          </button>
        </div>
        <div className='mt-2 flex flex-wrap gap-1.5'>
          {tags.map((tag, index) => (
            <Tag handleRemoveTag={tag => tag} key={index}>
              {tag}
            </Tag>
          ))}
        </div>
      </div>

      <div className='fixed inset-x-0 bottom-0 bg-white px-4'>
        <Button
          type='button'
          className='mb-5 mt-3 disabled:text-[#A1A1AA]'
          disabled={idDisabled}
          onClick={() => onNext(title, category, tagIds, price)}
        >
          다음
        </Button>
      </div>
    </div>
  );
};
