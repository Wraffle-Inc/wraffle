import {createProduct} from '../api/products';
import {useRouter} from 'next/navigation';
import {useMutation} from '@tanstack/react-query';
import {useToast} from '@wraffle/ui';

interface UseCreateProductProps {
  type: 'event' | 'raffle';
}

export const useCreateProduct = ({type}: UseCreateProductProps) => {
  const {toast} = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: response => {
      toast({
        title: '상품 생성 성공',
        duration: 2000,
        variant: 'success',
        icon: 'check',
      });
      const thumbnailFileName = response.data.thumbnail.split('/').pop();
      const productId = response.data.id;
      router.push(
        `/products/create/success?id=${productId}&thumbnail=${thumbnailFileName}&type=${type}`,
      );
    },
    onError: error => {
      toast({
        title: (error as Error).message,
        duration: 2000,
        variant: 'warning',
        icon: 'close',
      });
    },
  });
};
