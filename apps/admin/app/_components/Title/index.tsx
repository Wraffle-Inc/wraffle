import {ReactNode} from 'react';

type Props = {
  children: ReactNode;
};

const Title = ({children}: Props): JSX.Element => {
  return (
    <div className='w-full p-[22px]'>
      <h2 className='text-[24px] font-bold leading-normal text-brand-100'>
        {children}
      </h2>
    </div>
  );
};

export default Title;
