import ListBoardContent from '@/app/_components/ListBoardContent';
import SettlementList from '@/app/api/settlementList/type';
import formatDate from '@/app/utils/formatDate';

type Props = {
  isCheckBox: boolean;
  contents: SettlementList;
};

const SettlementListBoardContents: React.FC<Props> = ({
  isCheckBox,
  contents,
}) => {
  return (
    <div className='mx-[23px] mb-[32px]'>
      {contents.data.users.map(content => (
        <div className='flex flex-col'>
          <ul className='flex h-[60px] w-full flex-row justify-between text-[#71717A]'>
            <div className='flex flex-row'>
              {isCheckBox && (
                <input type='checkbox' className='mx-[30px] my-[9px]' />
              )}
              <ListBoardContent content={content.name} />
              <ListBoardContent content={formatDate(content.requestDate)} />
              <ListBoardContent content={content.email} />
              <ListBoardContent content={content.requestCharge} />
              <ListBoardContent content={content.remainCharge} />
            </div>
            <div className='flex w-[148px] items-center justify-center'>
              <button className='rounded bg-[#F2F4F6] px-[17.5px] py-[8px] text-[#4E5968]'>
                상세보기
              </button>
            </div>
          </ul>
          <div className='w-full border-b-[1px] border-[#F2F2F2]' />
        </div>
      ))}
    </div>
  );
};

export default SettlementListBoardContents;
