'use client';

import {useCategoryQuery} from '../../../../features/product/category/api/useCategoryQuery';
import {TagSection} from './Section/TagSection';
import {useFormContext, useWatch} from 'react-hook-form';
import type {CreateEventPayload} from '@/entities/product/model';
import {CategoryForm, PriceForm, TitleForm} from '@/features/product-form/ui';
import {getTypeText} from '@/shared/util';
import {Button, Typography} from '@wraffle/ui';

export const TitleStep = ({
  type,
  onNext,
}: {
  type: 'raffle' | 'event';
  onNext: (
    title: string,
    categoryId: string,
    tagIds: number[],
    price: string,
  ) => void;
}) => {
  const eventOrRaffleText = getTypeText(type);

  const {control, setValue} = useFormContext<CreateEventPayload>();

  const [title, categoryId, tagIds, price] = useWatch({
    control,
    name: ['title', 'categoryId', 'tagIds', 'price'],
  });

  const idDisabled = !title || !categoryId || !price;

  const {data: categoryItems} = useCategoryQuery();

  if (!categoryItems) {
    return <div>loading...</div>;
  }

  const suggestCategoryItems = categoryItems.items.map(item => ({
    value: String(item.id),
    name: item.name,
  }));

  const handleTagChange = (newTags: number[]) => {
    setValue('tagIds', newTags);
  };

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

      <CategoryForm
        defaultValue={categoryId}
        categoryItems={suggestCategoryItems}
      />

      <TagSection tagIds={tagIds} onTagChange={handleTagChange} />

      <PriceForm
        label={eventOrRaffleText.priceLabel}
        placeholder={eventOrRaffleText.pricePlaceholder}
        defaultValue={price}
      />

      <div className='fixed inset-x-0 bottom-0 bg-white px-4'>
        <Button
          type='button'
          className='mb-5 mt-3 disabled:text-[#A1A1AA]'
          disabled={idDisabled}
          onClick={() => onNext(title, categoryId, tagIds, price)}
        >
          다음
        </Button>
      </div>
    </div>
  );
};
