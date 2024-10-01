'use client';

import Image from 'next/image';
import {useEffect} from 'react';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Button,
} from '@wraffle/ui';

interface ApplyCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
}

const ApplyCompleteModal: React.FC<ApplyCompleteModalProps> = ({
  isOpen,
  onClose,
  image,
}) => {
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
          <DialogTitle>참여가 완료되었습니다</DialogTitle>
          <DialogDescription>
            <p>응모 후 당첨 시에만 결제를 진행해요!</p>
            <div className='mt-[20px] flex justify-center'>
              <Image
                src={image}
                alt='Product Thumbnail'
                className='h-[150px] w-[150px] rounded-lg object-cover'
                width={150}
                height={150}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button>응모 내역 상세보기</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyCompleteModal;
