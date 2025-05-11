'use client';

import {ProductImageStep} from './ProductImageStepList';
import {ProductListStep} from './ProductListStep';
import {ProductTitleStep} from './ProductTitleStepList';
import {useFormContext, useWatch} from 'react-hook-form';
import type {CreateEventPayload, Product} from '@/entities/product/model';
import {useFunnel} from '@use-funnel/browser';

interface listState {
  title?: string;
  imageUrl?: string;
}

interface titleState {
  title?: string;
  imageUrl?: string;
}

interface imageState {
  title: string;
  imageUrl?: string;
}

export const ProductList = ({
  onNext,
}: {
  onNext: (products: Product[]) => void;
}) => {
  const funnel = useFunnel<{
    listStep: listState;
    titleStep: titleState;
    imageStep: imageState;
  }>({
    id: 'addProduct',
    initial: {
      step: 'listStep',
      context: {},
    },
  });

  const {control, setValue} = useFormContext<CreateEventPayload>();
  const products = useWatch({
    control,
    name: 'products',
  });

  return (
    <funnel.Render
      listStep={({history}) => (
        <ProductListStep
          products={products}
          setValue={setValue}
          onNext={onNext}
          onCreate={() => history.push('titleStep')}
        />
      )}
      titleStep={({history}) => (
        <ProductTitleStep
          products={products}
          onNext={title => history.push('imageStep', {title})}
        />
      )}
      imageStep={({context, history}) => (
        <ProductImageStep
          title={context.title}
          products={products}
          setValue={setValue}
          onReturn={() => history.go(-2)}
        />
      )}
    />
  );
};
