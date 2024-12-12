import SideBarTab from './SideBarTab.tsx';
import Image from 'next/image';

export default function SideBar() {
  return (
    <div className='flex h-full w-full flex-col space-y-10 bg-[#F3F4F6] p-8'>
      {/* 헤더 */}
      <div className='w-full'>
        {/* 로고 */}
        <div className='mb-4 h-auto w-1/2'>
          <Image
            src='/logo.png'
            alt='logo'
            width={102}
            height={57}
            layout='responsive'
          />
        </div>

        {/* 계정정보 */}
        <div className='flex flex-col rounded bg-white p-2'>
          <p className='font-bold text-[#4D5562]'>어드민</p>
          <p className='text-[#777777]'>admin@admin.com</p>
        </div>
      </div>

      {/* 탭 */}
      <div className='flex w-full flex-col gap-y-4'>
        <SideBarTab href='/user'>회원 관리</SideBarTab>
        <SideBarTab href='/settlement'>정산 관리</SideBarTab>
        <SideBarTab href='/raffle-event'>래플/이벤트 관리</SideBarTab>
        <SideBarTab href='/category'>카테고리 관리</SideBarTab>
        <SideBarTab href='/push-notice'>푸시 알림 관리</SideBarTab>
        <SideBarTab href='/recommend-keyword'>추천 검색어 관리</SideBarTab>
        <SideBarTab href='/announcement'>공지사항 관리</SideBarTab>
        <SideBarTab href='/main-page'>메인 페이지 관리</SideBarTab>
      </div>
    </div>
  );
}
