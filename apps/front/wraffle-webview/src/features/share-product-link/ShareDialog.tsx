import {useEffect} from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  Icon,
} from '@wraffle/ui';

const ShareDialog = () => {
  useEffect(() => {
    document.body.style.overflow = 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <Dialog>
      <DialogTrigger>
        <Icon name='upload' />
      </DialogTrigger>
      <DialogContent withCloseButton={true}>
        <DialogHeader className='flex flex-col items-center'>
          <DialogTitle>공유하기</DialogTitle>
          <DialogDescription>래플을 친구에게 공유해보세요!</DialogDescription>
          <div className='mb-[20px] mt-[30px] flex justify-center gap-4'>
            <button
              onClick={() => console.log('Instagram Share')}
              className='flex items-center justify-center'
            >
              <img
                src='https://i.ibb.co/MDMTKFq/insta.png'
                alt='Instagram'
                className='h-[38px] w-[38px]'
              />
            </button>
            <button
              onClick={() => console.log('KakaoTalk Share')}
              className='flex items-center justify-center'
            >
              <img
                src='https://i.ibb.co/fv4T4x6/kakaotalk.png'
                alt='Kakao'
                className='h-[38px] w-[38px]'
              />
            </button>
            <button
              onClick={() =>
                navigator.clipboard.writeText(window.location.href)
              }
              className='flex items-center justify-center'
            >
              <img
                src='https://i.ibb.co/PjjqhMq/link.png'
                alt='Copy Link'
                className='h-[38px] w-[38px]'
              />
            </button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
