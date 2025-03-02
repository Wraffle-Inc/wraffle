type Props = {
  labels: string[];
  isCheckBox: boolean;
};

const ListBoardHeader = ({labels, isCheckBox}: Props): JSX.Element => {
  return (
    <div className='mx-[23px] mt-[18px]'>
      <ul className='flex w-full flex-row rounded-t-xl bg-[#FAFAFB]'>
        {isCheckBox && <input type='checkbox' className='mx-[30px] my-[9px]' />}
        {labels.map(label => (
          <li className='h-[46px] w-[148px] content-center text-center font-bold text-[#71717A]'>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListBoardHeader;
