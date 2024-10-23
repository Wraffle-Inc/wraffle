'use client';

import {
  createRaffleDefaultValues,
  createRaffleSchema,
} from '@/entities/create/model';
import {Header, ProgressBar} from '@/shared/ui';
import GenericForm from '@/shared/ui/form/GenericForm';
import {
  DateStep,
  EtcStep,
  ImageStep,
  SuccessList,
  TitleStep,
} from '@/widgets/product-list/create/ui';
import {zodResolver} from '@hookform/resolvers/zod';
import {createFunnelSteps, useFunnel} from '@use-funnel/browser';

export interface RaffleCreateState {
  title?: string;
  categoryId?: string;
  tagIds?: number[];
  price?: string;
  startDate?: Date;
  endDate?: Date;
  announceAt?: Date;
  winnerCount?: string;
  images?: string[];
  etc?: string;
}

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

  // TODO
  // 생성 api 연결
  const onSubmit = (data: RaffleCreateState) =>
    console.log('go to server : ', data);

  return (
    <div>
      {funnel.index < RaffleTotalStepIndex && (
        <div className='py-5'>
          <Header>
            <Header.BackButton onClick={() => funnel.history.back()} />
          </Header>
          <ProgressBar totalSteps={RaffleTotalStepIndex} index={funnel.index} />
        </div>
      )}

      <GenericForm
        onSubmit={() => onSubmit(funnel.context)}
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
          successStep={() => (
            <SuccessList type='raffle' productId={'1'} thumbnail={''} /> // productId,thumbnail api 연동후 작업
          )}
        />
      </GenericForm>
    </div>
  );
};

export default RaffleCreate;
