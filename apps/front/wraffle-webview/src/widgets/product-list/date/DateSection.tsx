import {
  ENDDATE_IS_OVER_ANNOUNCEAT,
  STARTDATE_IS_OVER_ENDDATE,
} from '@/features/product-form/config/const';
import {isDateBeforeReferenceDate} from '@/features/product-form/config/isDateBeforeReferenceDate';
import {
  AnnounceAtForm,
  EndDateForm,
  StartDateForm,
} from '@/features/product-form/ui';
import {Divider} from '@/shared/ui';
import {Label, useToast} from '@wraffle/ui';

interface DateSectionProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  announceAt: Date | undefined;
}

export const DateSection = ({
  startDate,
  endDate,
  announceAt,
}: DateSectionProps) => {
  const {toast} = useToast();

  const handleSelectStartDate = (
    date: Date | undefined,
    onChange: (date: Date | undefined) => void,
  ) => {
    if (isDateBeforeReferenceDate({date, referenceDate: endDate})) {
      onChange(date);
    } else {
      toast(STARTDATE_IS_OVER_ENDDATE);
    }
  };

  const handleSelectEndDate = (
    date: Date | undefined,
    onChange: (date: Date | undefined) => void,
  ) => {
    if (isDateBeforeReferenceDate({date, referenceDate: announceAt})) {
      onChange(date);
    } else {
      toast(ENDDATE_IS_OVER_ANNOUNCEAT);
    }
  };

  return (
    <>
      <div>
        <Label className='text-xl font-bold text-zinc-900'>응모 기간*</Label>
        <StartDateForm
          defaultValue={startDate}
          onSelect={handleSelectStartDate}
        />
        <div className='h-2.5'></div>
        <EndDateForm
          defaultValue={endDate}
          fromDate={startDate}
          onSelect={handleSelectEndDate}
        />
      </div>

      <Divider />

      <AnnounceAtForm
        defaultValue={announceAt}
        fromDate={endDate}
        startDate={startDate}
      />
    </>
  );
};
