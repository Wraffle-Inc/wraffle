import {Icon, Typography} from '@wraffle/ui';

const Footer = () => {
  return (
    <div className='inline-flex w-full flex-col gap-8 bg-zinc-100 px-8 pb-20 pt-8'>
      <div>
        <Icon name='social-instagram' />
      </div>

      <div className='flex flex-col gap-3'>
        <Typography size='h6' color='zinc500'>
          고객센터
        </Typography>
        <Typography size='p3' color='zinc500'>
          전화 : 02-123-1234 <br />
          전화가능시간 : 10:00am - 7:00pm <br />
          cs 가능시간 : 10:00am - 5:00pm
        </Typography>
        <Typography size='p3' color='zinc500'>
          공지사항
        </Typography>
        <Typography size='p3' color='zinc500'>
          개인정보 처리방침
        </Typography>
        <Typography size='p3' color='zinc500'>
          이용약관
        </Typography>
      </div>

      <div className='flex flex-col gap-2'>
        <Typography size='h6' color='zinc500'>
          WRAFFLE
        </Typography>
        <Typography size='p4' color='zinc400'>
          대표 : 홍길동 | 사업자등록번호 : 123-12-12345 | 통신판매업신고번호 :
          번호필요 | 주소 : 서울 | 연락처 : 1234-1234
        </Typography>
      </div>

      <hr className='color-zinc-200' />

      <div>
        <Typography size='p4' color='zinc400'>
          Copyright © 2024 Wraffle. All rights reserved.
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
