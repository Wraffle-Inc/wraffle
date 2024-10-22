import {Header} from '@/shared/ui';
import Footer from '@/widgets/my-profile/ui/Footer';
import {DualInfoBox} from '@/widgets/my-profile/ui/InfoBox';
import {Icon, Typography} from '@wraffle/ui';
import BottomNavigation from '@wraffle/ui/src/ui/bottomNavigation/BottomNavigation';
import IconWithLabel from '@wraffle/ui/src/ui/iconWithLabel/IconWithLabel';

function MyProfilePage() {
  return (
    <div>
      <Header>
        <Header.Middle>마이페이지</Header.Middle>
      </Header>

      <div className='mt-5 flex flex-col'>
        <Typography size='h2'>홍길동님</Typography>

        <div className='mt-1 flex items-center'>
          <Typography
            size='h6'
            color='zinc500'
            className='mr-1 pt-1 font-normal'
          >
            내정보 수정
          </Typography>
          <Icon name='chevron-right' stroke='#4E5968' width={14} height={14} />
        </div>

        <div className='mt-6'>
          <DualInfoBox
            leftLabel='적립금'
            leftValue='1,000원'
            rightLabel='쿠폰'
            rightValue='0개'
          />
        </div>

        <div className='mx-5 mt-4 flex h-16 items-center justify-between'>
          <IconWithLabel Icon={<Icon name='gift' />} label='내 래플' />
          <IconWithLabel Icon={<Icon name='credit-card' />} label='카드 관리' />
          <IconWithLabel
            Icon={<Icon name='shopping-box' />}
            label='응모 내역'
          />
          <IconWithLabel Icon={<Icon name='bookmark' />} label='스크랩' />
        </div>

        {/* TODO: container css에 padding이 들어가있어서 w-full이 안됨 */}
        <div className='mt-4 h-2.5 border border-zinc-200 bg-zinc-100' />

        <ul>
          <li className='flex h-14 items-center border-b-2 border-b-zinc-100'>
            <Typography size='h6' color='zinc700' className='font-normal'>
              내 정산금 관리
            </Typography>
          </li>
          <li className='flex h-14 items-center border-b-2 border-b-zinc-100'>
            <Typography size='h6' color='zinc700' className='font-normal'>
              공지사항
            </Typography>
          </li>
          <li className='flex h-14 items-center border-b-2 border-b-zinc-100'>
            <Typography size='h6' color='zinc700' className='font-normal'>
              로그아웃
            </Typography>
          </li>
        </ul>
      </div>

      <Footer />

      <BottomNavigation />
    </div>
  );
}

export default MyProfilePage;
