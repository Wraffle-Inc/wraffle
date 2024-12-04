'use client';

import Link from 'next/link';
import {useGetUserInfo} from '@/features/my-profile/api/user';
import {Header} from '@/shared/ui';
import {Icon, Typography} from '@wraffle/ui';
import IconWithLabel from '@wraffle/ui/src/ui/iconWithLabel/IconWithLabel';

const MyProfilePage = () => {
  const {data: userInfoResponse} = useGetUserInfo();
  const nickname = userInfoResponse?.nickname || '';

  return (
    <div>
      <Header>
        <Header.Middle>
          <Typography size='h4' color='zinc700'>
            마이페이지
          </Typography>
        </Header.Middle>
      </Header>

      <div className='py-8'>
        <div className='px-8'>
          <Typography size='h2'>{nickname}님</Typography>
        </div>

        <Link
          href='/my-profile/edit'
          className='ml-8 mt-1 inline-flex items-center'
        >
          <Typography size='p3' color='zinc500'>
            내정보 수정
          </Typography>
          <Icon name='chevron-right' stroke='#4E5968' width={14} height={14} />
        </Link>

        {/* TODO: 2차 개발 때 진행할 예정 */}
        {/* <div className='mt-6 px-8'>
          <DualInfoBox
            leftLabel='적립금'
            leftValue='1,000원'
            rightLabel='쿠폰'
            rightValue='0개'
          />
        </div> */}

        <div className='mx-5 mt-4 flex h-16 items-center justify-between px-8'>
          <IconWithLabel Icon={<Icon name='gift' />} label='내 래플' />
          <IconWithLabel Icon={<Icon name='credit-card' />} label='카드 관리' />
          <IconWithLabel
            Icon={<Icon name='shopping-box' />}
            label='응모 내역'
          />
          <IconWithLabel Icon={<Icon name='bookmark' />} label='스크랩' />
        </div>

        <div className='mt-4 h-2.5 border border-zinc-200 bg-zinc-100' />

        <ul className='px-8'>
          <li className='flex h-14 items-center border-b-2 border-b-zinc-100'>
            <Link href='/my-profile/settlement'>
              <Typography size='p3' color='zinc700'>
                내 정산금 관리
              </Typography>
            </Link>
          </li>
          <li className='flex h-14 items-center border-b-2 border-b-zinc-100'>
            <Typography size='p3' color='zinc700'>
              공지사항
            </Typography>
          </li>
          <li className='flex h-14 items-center border-b-2 border-b-zinc-100'>
            <Typography size='p3' color='zinc700'>
              로그아웃
            </Typography>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MyProfilePage;
