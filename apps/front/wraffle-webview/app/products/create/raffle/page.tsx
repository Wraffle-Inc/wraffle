'use client';

import type {
  CreateRafflePayload,
  RaffleCreateState,
} from '@/entities/product/model';
import {
  createRaffleDefaultValues,
  createRaffleSchema,
} from '@/entities/product/model';
import {useCreateProductMutation} from '@/features/product/create/api/useCreateQuery';
import type {Payload} from '@/features/product/create/config/type';
import {GenericForm, Header, ProgressBar} from '@/shared/ui';
import {
  DateStep,
  EtcStep,
  ImageStep,
  SuccessList,
  TitleStep,
} from '@/widgets/product-list/create/ui';
import {zodResolver} from '@hookform/resolvers/zod';
import {createFunnelSteps, useFunnel} from '@use-funnel/browser';

const steps = createFunnelSteps<RaffleCreateState>()
  .extends('titleStep')
  .extends('dateStep', {
    requiredKeys: ['title', 'categoryId', 'tagIds', 'price'],
  })
  .extends('imageStep', {
    requiredKeys: ['startDate', 'endDate', 'announceAt', 'winnerCount'],
  })
  .extends('etcStep', {requiredKeys: 'images'})
  .extends('successStep', {requiredKeys: 'etc'})
  .build();

const RaffleCreate = () => {
  const funnel = useFunnel({
    id: 'raffle',
    steps: steps,
    initial: {
      step: 'titleStep',
      context: {},
    },
  });
  const RaffleTotalStepIndex = 4;

  const {mutateAsync: createProduct, data} = useCreateProductMutation();

  const onSubmit = async (data: CreateRafflePayload) => {
    const formatRaffleData: Payload = {
      type: 'raffle',
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
    };
    try {
      await createProduct(formatRaffleData);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {funnel.index < RaffleTotalStepIndex && (
        <div className='py-5'>
          <Header>
            <Header.Left>
              <Header.BackButton onClick={() => funnel.history.back()} />
            </Header.Left>
          </Header>
          <ProgressBar totalSteps={RaffleTotalStepIndex} index={funnel.index} />
        </div>
      )}

      <GenericForm
        onSubmit={onSubmit}
        formOptions={{
          mode: 'onChange',
          resolver: (data, context, options) => {
            const formData = {...data, ...funnel.context};
            return zodResolver(createRaffleSchema)(formData, context, options);
          },
          defaultValues: createRaffleDefaultValues,
        }}
      >
        <funnel.Render
          titleStep={({history}) => (
            <TitleStep
              type='raffle'
              onNext={(title, categoryId, tagIds, price) =>
                history.push('dateStep', {title, categoryId, tagIds, price})
              }
            />
          )}
          dateStep={({history}) => (
            <DateStep
              type='raffle'
              onNext={(startDate, endDate, announceAt, winnerCount) =>
                history.push('imageStep', {
                  startDate,
                  endDate,
                  announceAt,
                  winnerCount,
                })
              }
            />
          )}
          imageStep={({history}) => (
            <ImageStep onNext={images => history.push('etcStep', {images})} />
          )}
          etcStep={({history}) => (
            <EtcStep onNext={etc => history.push('successStep', {etc})} />
          )}
          successStep={() => <SuccessList type='raffle' productData={data} />}
        />
      </GenericForm>
    </div>
  );
};

export default RaffleCreate;
