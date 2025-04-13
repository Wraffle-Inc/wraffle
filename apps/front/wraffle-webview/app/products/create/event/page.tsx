'use client';

import type {
  CreateEventPayload,
  EventCreateState,
} from '@/entities/product/model';
import {
  createEventDefaultValues,
  createEventSchema,
} from '@/entities/product/model';
import type {Payload} from '@/features/product/create/config/type';
import {useCreateProductSubmit} from '@/features/product/create/hooks/useCreateProudctSubmit';
import {GenericForm, Header, ProgressBar} from '@/shared/ui';
import {
  DateStep,
  EtcStep,
  ImageStep,
  ProductList,
  TitleStep,
} from '@/widgets/product-list/create/ui';
import {zodResolver} from '@hookform/resolvers/zod';
import {createFunnelSteps, useFunnel} from '@use-funnel/browser';

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
  const EventTotalStepIndex = 5;
  const {onSubmit} = useCreateProductSubmit({type: 'event'});

  const handleSubmit = async (data: CreateEventPayload) => {
    const formatEventData: Payload = {
      type: 'event',
      title: data.title,
      categoryId: Number(data.categoryId),
      tagIds: data.tagIds,
      price: Number(data.price),
      startDate: String(data.startDate),
      endDate: String(data.endDate),
      announceAt: String(data.announceAt),
      winnerCount: Number(data.winnerCount),
      images: data.images,
      etc: data.etc,
      products: data.products,
    };

    await onSubmit(formatEventData);
  };

  return (
    <div>
      {funnel.index < EventTotalStepIndex && (
        <div className='my-5'>
          <Header>
            <Header.Left>
              <Header.BackButton onClick={() => funnel.history.back()} />
            </Header.Left>
          </Header>
          <ProgressBar totalSteps={EventTotalStepIndex} index={funnel.index} />
        </div>
      )}

      <GenericForm
        onSubmit={handleSubmit}
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
          etcStep={() => <EtcStep />}
        />
      </GenericForm>
    </div>
  );
};

export default EventCreate;
