import type {PropsWithChildren} from 'react';

function BottomFixedBox({children}: PropsWithChildren) {
  return (
    <div className='fixed bottom-0 left-0 right-0 mb-4 px-8'>{children}</div>
  );
}

export default BottomFixedBox;
