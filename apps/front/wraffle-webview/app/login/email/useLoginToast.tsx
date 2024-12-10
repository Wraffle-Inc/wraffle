import {useEffect} from 'react';
import {ERROR_STATUS} from '@/shared/util';
import {useToast} from '@wraffle/ui';

interface Props {
  code: string | null;
}

const useLoginToast = ({code}: Props) => {
  const {toast} = useToast();

  if (!code) return;

  useEffect(() => {
    switch (code) {
      case ERROR_STATUS.NON_EXISTENT_ACCOUNT.code: {
        toast({
          title: ERROR_STATUS.NON_EXISTENT_ACCOUNT.message,
          duration: 2000,
          variant: 'warning',
          icon: 'close',
        });
        break;
      }
      case ERROR_STATUS.MISMATCHED_PASSWORD.code: {
        toast({
          title: ERROR_STATUS.MISMATCHED_PASSWORD.message,
          duration: 2000,
          variant: 'warning',
          icon: 'close',
        });
        break;
      }
      default: {
        toast({
          title: '로그인에 실패했습니다.',
          duration: 2000,
          variant: 'warning',
          icon: 'close',
        });
      }
    }
  }, []);
};

export default useLoginToast;
