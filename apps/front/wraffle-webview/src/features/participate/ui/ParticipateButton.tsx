'use client';

import ParticipateDialog from './ParticipateDialog';
import React, {useState} from 'react';
import {Button, Icon} from '@wraffle/ui';

interface ParticipateButtonProps {
  status: string;
  clipCount: number;
  isApplied: boolean;
  productImage: string;
}

const ParticipateButton = ({
  status,
  clipCount,
  isApplied: initialApplyStatus,
  productImage,
}: ParticipateButtonProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isApplied, setIsApplied] = useState(initialApplyStatus);

  const handleBookmark = () => {
    setIsBookmarked(prev => !prev);
  };

  const handleApply = () => {
    setIsApplied(true);
  };

  if (status === 'after') {
    return (
      <div className='p-4'>
        <Button variant='gray'>응모 마감</Button>
      </div>
    );
  }

  return (
    <div className='flex gap-4 p-2'>
      <button onClick={handleBookmark}>
        <div className='flex flex-col items-center justify-center'>
          <Icon name='bookmark' color={isBookmarked ? 'black' : ''} />
          <span>{isBookmarked ? `${clipCount + 1}` : `${clipCount}`}</span>
        </div>
      </button>
      <ParticipateDialog
        isApplied={isApplied}
        handleApply={handleApply}
        productImage={productImage}
      />
    </div>
  );
};

export default ParticipateButton;
