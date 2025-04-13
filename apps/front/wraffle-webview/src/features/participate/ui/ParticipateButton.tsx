'use client';

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
  const [isApplied, setIsApplied] = useState(initialApplyStatus);

  const handleApply = () => {
    setIsApplied(true);
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
      {isCreator ? (
        <Button variant='default'>추첨하러 가기</Button>
      ) : (
        <>
          <ClippingButton
            targetId={productId}
            type={productType}
            clipCount={clipCount}
            isInitiallyClipped={isClipped}
            initialClippingId={clippingId}
          />
          <ParticipateDialog
            isApplied={isApplied}
            handleApply={handleApply}
            productImage={productImage}
          />
        </>
      )}
    </div>
  );
};

export default ParticipateButton;
