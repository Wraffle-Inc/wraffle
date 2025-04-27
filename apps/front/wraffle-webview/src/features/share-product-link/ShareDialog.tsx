import Image from 'next/image';
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
              <Image
                src='https://github.com/user-attachments/assets/0082c9bf-d7c6-4979-851e-7a6aee60aa72'
                alt='Instagram'
                width={38}
                height={38}
              />
            </button>
            <button
              onClick={() => console.log('KakaoTalk Share')}
              className='flex items-center justify-center'
            >
              <Image
                src='https://github.com/user-attachments/assets/0c8a3f28-4d5a-40bc-9966-1dd686313903'
                alt='Kakao'
                width={38}
                height={38}
              />
            </button>
            <button
              onClick={() =>
                navigator.clipboard.writeText(window.location.href)
              }
              className='flex items-center justify-center'
            >
              <Image
                src='https://github.com/user-attachments/assets/183fd7de-9628-45f4-8af2-7abc7af28f24'
                alt='Copy Link'
                width={38}
                height={38}
              />
            </button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
