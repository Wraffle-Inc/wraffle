import {ReactNode} from 'react';

interface Props {
  content: ReactNode;
}

const ListBoardContent = ({content}: Props): JSX.Element => {
  return (
    <li className='flex w-[148px] items-center justify-center'>{content}</li>
  );
};

export default ListBoardContent;
