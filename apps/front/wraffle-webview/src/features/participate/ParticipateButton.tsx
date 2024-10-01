'use client';

import ApplyCompleteModal from './\bApplyCompleteModal';
import React, {useState} from 'react';
import {Button, Icon} from '@wraffle/ui';

interface ParticipateButtonProps {
  status: string;
  clipCount: number;
  applyStatus: boolean;
  productImage: string;
}

const ParticipateButton: React.FC<ParticipateButtonProps> = ({
  status,
  clipCount,
  applyStatus: initialApplyStatus,
  productImage,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isApplyCompleteModalOpen, setIsApplyCompleteModalOpen] =
    useState(false);
  const [applyStatus, setApplyStatus] = useState(initialApplyStatus);

  const handleBookmark = () => {
    setIsBookmarked(prev => !prev);
  };

  const handleApply = () => {
    setApplyStatus(true); // 응모 상태로 변경
    setIsApplyCompleteModalOpen(true); // 이후 응모 완료 모달 열기
  };

  const closeApplyCompleteModal = () => {
    setIsApplyCompleteModalOpen(false);
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
      {applyStatus ? (
        <Button variant='gray'>응모를 완료하였습니다</Button>
      ) : (
        <Button variant='default' onClick={handleApply}>
          응모하기
        </Button>
      )}
      <ApplyCompleteModal
        isOpen={isApplyCompleteModalOpen}
        onClose={closeApplyCompleteModal}
        image={productImage}
      />
    </div>
  );
};

export default ParticipateButton;
