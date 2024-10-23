'use client';

import {
  createEventDefaultValues,
  createEventSchema,
} from '@/entities/create/model';
import {Header, ProgressBar} from '@/shared/ui';
import GenericForm from '@/shared/ui/form/GenericForm';
import {
  DateStep,
  ImageStep,
  EtcStep,
  TitleStep,
  ProductList,
  SuccessList,
} from '@/widgets/product-list/create/ui';
import {zodResolver} from '@hookform/resolvers/zod';
import {createFunnelSteps, useFunnel} from '@use-funnel/browser';

export interface Product {
  title: string;
  tagIds: number[];
  imageUrl: string;
}

export interface EventCreateState {
  title?: string;
  categoryId?: string;
  tagIds?: number[];
  price?: string;
  startDate?: Date;
  endDate?: Date;
  announceAt?: Date;
  winnerCount?: string;
  products?: Product[];
  images?: string[];
  etc?: string;
}

const steps = createFunnelSteps<EventCreateState>()
  .extends('titleStep')
  .extends('dateStep', {
    requiredKeys: ['title', 'categoryId', 'tagIds', 'price'],
  })
  .extends('productStep', {
    requiredKeys: ['startDate', 'endDate', 'announceAt', 'winnerCount'],
  })
  .extends('imageStep', {
    requiredKeys: 'products',
  })
  .extends('etcStep', {requiredKeys: 'images'})
  .extends('successStep', {requiredKeys: 'etc'})
  .build();

const EventCreate = () => {
  const funnel = useFunnel({
    id: 'event',
    steps: steps,
    initial: {
      step: 'titleStep',
      context: {},
    },
  });

  const EventStepIndex = 5;

  // TODO
  // 생성 api 연동
  const onSubmit = (data: EventCreateState) => {
    console.log('go : ', data);
  };

  console.log(funnel.context);

  return (
    <div>
      {funnel.index < EventStepIndex && (
        <div className='py-5'>
          <Header>
            <Header.BackButton onClick={() => funnel.history.back()} />
          </Header>
          <ProgressBar totalSteps={EventStepIndex} index={funnel.index} />
        </div>
      )}

      <GenericForm
        onSubmit={() => onSubmit(funnel.context)}
        formOptions={{
          mode: 'onChange',
          resolver: (data, context, options) => {
            const formData = {...data, ...funnel.context};
            return zodResolver(createEventSchema)(formData, context, options);
          },
          defaultValues: createEventDefaultValues,
        }}
      >
        <funnel.Render
          titleStep={({history}) => (
            <TitleStep
              type='event'
              onNext={(title, categoryId, tagIds, price) =>
                history.push('dateStep', {title, categoryId, tagIds, price})
              }
            />
          )}
          dateStep={({history}) => (
            <DateStep
              type='event'
              onNext={(startDate, endDate, announceAt, winnerCount) =>
                history.push('productStep', {
                  startDate,
                  endDate,
                  announceAt,
                  winnerCount,
                })
              }
            />
          )}
          productStep={({history}) => (
            <ProductList
              onNext={products => history.push('imageStep', {products})}
            />
          )}
          imageStep={({history}) => (
            <ImageStep onNext={images => history.push('etcStep', {images})} />
          )}
          etcStep={({history}) => (
            <EtcStep onNext={etc => history.push('successStep', {etc})} />
          )}
          successStep={() => (
            <SuccessList type='event' productId={'1'} thumbnail={''} /> // productId,thumbnail api 연동후 작업
          )}
        />
      </GenericForm>
    </div>
  );
};

export default EventCreate;
