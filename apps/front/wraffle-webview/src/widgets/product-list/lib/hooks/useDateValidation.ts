import {useEffect} from 'react';
import {useFormContext} from 'react-hook-form';
import {useToast} from '@wraffle/ui';

interface UseDateValidationProps {
  startDate: Date;
  endDate: Date;
  announceAt: Date;
}

export const useDateValidation = ({
  startDate,
  endDate,
  announceAt,
}: UseDateValidationProps) => {
  const {setValue} = useFormContext();
  const {toast} = useToast();

  useEffect(() => {
    if (endDate < startDate) {
      setValue('endDate', startDate);
      toast({
        title: '응모 마감 일정은',
        description: '응모 시작 일정 이후로 설정해주세요.',
        duration: 10000,
        variant: 'warning',
      });
    }

    if (announceAt < endDate) {
      setValue('announceAt', endDate);
      toast({
        title: '당첨자 발표 일정은',
        description: '응모 마감 일정 이후로 설정해주세요.',
        duration: 10000,
        variant: 'warning',
      });
    }
  }, [startDate, endDate, announceAt]);
};
