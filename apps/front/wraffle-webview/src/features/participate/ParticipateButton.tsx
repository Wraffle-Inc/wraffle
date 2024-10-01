'use client';

import React, {useState} from 'react';
import {Button, Icon} from '@wraffle/ui';

interface ParticipateButtonProps {
  status: string;
  clipCount: number;
  applyStatus: boolean;
}

const ParticipateButton: React.FC<ParticipateButtonProps> = ({
  status,
  clipCount,
  applyStatus,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(prev => !prev);
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
        <Button variant='default'>응모하기</Button>
      )}
    </div>
  );
};

export default ParticipateButton;
