import type {Payload} from '../config/type';
import {useCreateProductMutation} from './useCreateQuery';
import {useRouter} from 'next/navigation';
import {useToast} from '@wraffle/ui';

interface UseCreateProductSubmitProps {
  type: 'event' | 'raffle';
}

export const useCreateProductSubmit = ({type}: UseCreateProductSubmitProps) => {
  const router = useRouter();
  const {mutateAsync: createProduct} = useCreateProductMutation();
  const {toast} = useToast();

  const onSubmit = async (data: Payload) => {
    try {
      const response = await createProduct(data);
      const thumbnailFileName = response.thumbnail.split('/').pop();
      router.push(
        `/products/create/success?id=${response.id}&thumbnail=${thumbnailFileName}&type=${type}`,
      );
    } catch (e) {
      toast({
        title: (e as Error).message,
        duration: 2000,
        variant: 'warning',
        icon: 'close',
      });
    }
  };

  return {onSubmit};
};
