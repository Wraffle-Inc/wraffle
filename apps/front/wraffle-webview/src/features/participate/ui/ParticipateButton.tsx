'use client';

import {applyProduct} from '../api/applyProduct';
import ParticipateDialog from './ParticipateDialog';
import React, {useState} from 'react';
import {ClippingButton} from '@/features/clipping/ui/ClippingButton';
import {Button} from '@wraffle/ui';

interface ParticipateButtonProps {
  status: string;
  clipCount: number;
  isApplied: boolean;
  productImage: string;
  isCreator: boolean;
  productId: number;
  productType: 'RAFFLE' | 'EVENT';
  isClipped: boolean;
  clippingId?: number;
}

const ParticipateButton = ({
  status,
  clipCount,
  isApplied: initialApplyStatus,
  productImage,
  isCreator,
  productId,
  productType,
  isClipped,
  clippingId,
}: ParticipateButtonProps) => {
  const [isApplied, setIsApplied] = useState(() => initialApplyStatus);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleApply = async () => {
    try {
      const response = await applyProduct({
        targetId: productId,
        type: productType,
      });

      console.log('API 응답 수신:', response);
      if (response.applyStatus === 'WAITING') {
        console.log('🎉 응모 성공, 상태 업데이트');
        setIsApplied(true);
        setDialogOpen(true);
      } else {
        console.log('응모 상태가 WAITING 아님:', response.applyStatus);
      }
    } catch (error) {
      console.error('❗ 응모 중 에러 발생:', error);
      alert('예상치 못한 에러가 발생했습니다.');
    }
  };

  if (status === 'after') {
    return (
      <div className='p-4'>
        <Button variant='gray'>{isCreator ? '추첨 완료' : '응모 마감'}</Button>
      </div>
    );
  }

  return (
    <div className='flex gap-4 p-2'>
      {!isCreator && (
        <>
          <ClippingButton
            targetId={productId}
            type={productType}
            clipCount={clipCount}
            isInitiallyClipped={isClipped}
            initialClippingId={clippingId}
          />

          <Button disabled={isApplied} onClick={handleApply}>
            {isApplied ? '응모를 완료하였습니다' : '응모하기'}
          </Button>
        </>
      )}
      <ParticipateDialog
        isApplied={isApplied}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        productImage={productImage}
      />
    </div>
  );
};

export default ParticipateButton;
