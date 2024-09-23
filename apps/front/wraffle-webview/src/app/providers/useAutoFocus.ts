import {useRef} from 'react';

const useAutoFocus = (
  maxLength: number,
): [
  React.RefObject<HTMLInputElement>,
  (
    event: React.KeyboardEvent<HTMLInputElement>,
    nextRef: React.RefObject<HTMLInputElement> | null,
  ) => void,
] => {
  const ref = useRef<HTMLInputElement>(null);

  const handleKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>,
    nextRef: React.RefObject<HTMLInputElement> | null,
  ) => {
    if (event.currentTarget.value.length >= maxLength) {
      nextRef?.current?.focus();
    }
  };

  return [ref, handleKeyUp];
};

export default useAutoFocus;
