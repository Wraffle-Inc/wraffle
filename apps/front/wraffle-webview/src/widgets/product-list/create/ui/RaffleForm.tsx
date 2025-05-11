'use client';

import type {
  CreateRafflePayload,
  RaffleCreateState,
} from '@/entities/product/model';
import {
  createRaffleDefaultValues,
  createRaffleSchema,
} from '@/entities/product/model';
import {useFileUpload} from '@/features/image-handle/hooks/useFileUpload';
import type {Payload} from '@/features/product/create/config/type';
import {useCreateProduct} from '@/features/product/create/hooks/useCreateQuery';
import {GenericForm, Header, ProgressBar} from '@/shared/ui';
import {
  DateStep,
  EtcStep,
  ImageStep,
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
  .build();

export const RaffleForm = () => {
  const funnel = useFunnel({
    id: 'raffle',
    steps: steps,
    initial: {
      step: 'titleStep',
      context: {},
    },
  });
  const RaffleTotalStepIndex = 4;
  const {mutateAsync: createProduct} = useCreateProduct({type: 'raffle'});
  const {mutateAsync: uploadImages} = useFileUpload();

  const handleSubmit = async (data: CreateRafflePayload) => {
    const imageUrls = await uploadImages(data.images);

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
      images: imageUrls,
      etc: data.etc,
    };

    await createProduct(formatRaffleData);
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
        onSubmit={handleSubmit}
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
                history.push('dateStep', {
                  title,
                  categoryId,
                  tagIds,
                  price,
                })
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
          etcStep={() => <EtcStep />}
        />
      </GenericForm>
    </div>
  );
};
