'use client';

import Image from 'next/image';
import React from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@wraffle/ui';

interface DialogComponentProps {
  isApplied: boolean;
  open: boolean;
  productImage: string;
  onOpenChange: (open: boolean) => void;
}

const ParticipateDialog = ({
  open,
  onOpenChange,
  productImage,
}: DialogComponentProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent withCloseButton={true}>
        <DialogHeader className='flex flex-col items-center'>
          <DialogTitle>참여가 완료되었습니다</DialogTitle>
          <DialogDescription>
            응모 후 당첨 시에만 결제를 진행해요!
          </DialogDescription>

          <div className='mt-[20px] flex justify-center'>
            <Image
              src={productImage}
              alt='Product Thumbnail'
              className='h-[150px] w-[150px] rounded-lg object-cover'
              width={150}
              height={150}
            />
          </div>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>응모 내역 상세보기</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ParticipateDialog;
