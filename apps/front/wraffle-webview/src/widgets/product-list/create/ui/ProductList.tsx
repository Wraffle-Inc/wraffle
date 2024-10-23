import {ProductImageStep} from './ProductImageStepList';
import {ProductListStep} from './ProductListStep';
import {ProductTitleStep} from './ProductTitleStepList';
import type {Product} from 'app/products/create/event/page';
import {useFormContext} from 'react-hook-form';
import type {CreateEventPayload} from '@/entities/create/model';
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

  const {setValue, getValues} = useFormContext<CreateEventPayload>();
  const products = getValues('products');

  return (
    <funnel.Render
      listStep={({history}) => (
        <ProductListStep
          products={products}
          onNext={onNext}
          onCreate={() => history.push('titleStep')}
        />
      )}
      titleStep={({history}) => (
        <ProductTitleStep
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
