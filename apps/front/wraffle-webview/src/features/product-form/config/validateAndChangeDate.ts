import {isDateBeforeReferenceDate} from './isDateBeforeReferenceDate';

interface ToastInfo {
  title: string;
  description: string;
  duration: number;
  variant: string;
}

interface ValidateAndChangeDateProps {
  date: Date | undefined;
  referenceDate: Date | undefined;
  onChange: (selected: Date | undefined) => void;
  toastInfo: ToastInfo;
  toast: (info: ToastInfo) => void;
}

export const validateAndChangeDate = ({
  date,
  referenceDate,
  onChange,
  toastInfo,
  toast,
}: ValidateAndChangeDateProps) => {
  if (isDateBeforeReferenceDate(date, referenceDate)) {
    onChange(date);
  } else {
    toast(toastInfo);
  }
};
