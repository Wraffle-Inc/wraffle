import {uploadImage} from '../api/imageUpload';
import {useMutation} from '@tanstack/react-query';
import {useToast} from '@wraffle/ui';

export const useFileUpload = () => {
  const {toast} = useToast();
  return useMutation({
    mutationFn: uploadImage,
    onSuccess: () => {
      console.log('success');
    },
    onError: error => {
      toast({
        title: error.message,
        duration: 2000,
        variant: 'warning',
        icon: 'close',
      });
    },
  });
};
