'use client';

import {useEffect} from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@wraffle/ui';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({isOpen, onClose}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent withCloseButton={true}>
        <DialogHeader className='flex flex-col items-center'>
          <DialogTitle>공유하기</DialogTitle>
          <DialogDescription>
            <p>래플을 친구에게 공유해보세요!</p>
            <div className='mb-[20px] mt-[30px] flex justify-center gap-4'>
              <button
                onClick={() => console.log('instagram Share')}
                className='flex items-center justify-center'
              >
                <img
                  src='https://i.ibb.co/MDMTKFq/insta.png'
                  alt='instagram'
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
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
