import type {PropsWithChildren} from 'react';

interface BottomFixedBoxProps extends PropsWithChildren {
  className?: string;
}

function BottomFixedBox({children, className}: BottomFixedBoxProps) {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 mb-4 px-8 ${className || ''}`}
    >
      {children}
    </div>
  );
}

export default BottomFixedBox;
