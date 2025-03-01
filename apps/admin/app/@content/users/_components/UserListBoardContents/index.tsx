import UserList from '@/app/api/userList/type';
import formatDate from '@/app/utils/formatDate';

type Props = {
  isCheckBox: boolean;
  contents: UserList;
};

const UserListBoardContents: React.FC<Props> = ({isCheckBox, contents}) => {
  return (
    <div className='mx-[23px] mb-[32px]'>
      {contents.data.users.map(content => (
        <div className='flex flex-col'>
          <ul className='flex h-[60px] w-full flex-row justify-between text-[#71717A]'>
            <div className='flex flex-row'>
              {isCheckBox && (
                <input type='checkbox' className='mx-[30px] my-[9px]' />
              )}
              <li
                key={content.id}
                className='flex w-[148px] items-center justify-center'
              >
                {content.name}
              </li>
              <li
                key={content.id}
                className='flex w-[148px] items-center justify-center'
              >
                {formatDate(content.createdAt)}
              </li>
              <li
                key={content.id}
                className='flex w-[148px] items-center justify-center'
              >
                {content.email}
              </li>
              <li
                key={content.id}
                className='flex w-[148px] items-center justify-center'
              >
                {content.wraffleCount}
              </li>
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

export default UserListBoardContents;
