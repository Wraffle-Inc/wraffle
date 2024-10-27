import clsx from 'clsx';
import type {PropsWithChildren} from 'react';

interface BottomFixedBoxProps extends PropsWithChildren {
  className?: string;
}

function BottomFixedBox({children, className}: BottomFixedBoxProps) {
  return (
    <div
      className={clsx(
        'fixed bottom-0 left-0 right-0 mb-4 px-5',
        className || '',
      )}
    >
      {children}
    </div>
  );
}

export default BottomFixedBox;
