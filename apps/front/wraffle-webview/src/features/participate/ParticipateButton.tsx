'use client';

import React, {useState} from 'react';
import {Button, Icon} from '@wraffle/ui';

interface ParticipateButtonProps {
  status: string;
  clipCount: number;
}

const ParticipateButton: React.FC<ParticipateButtonProps> = ({
  status,
  clipCount,
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
    <div className='flex gap-4 p-4'>
      <button onClick={handleBookmark}>
        <div className='flex flex-col items-center justify-center'>
          <Icon name='bookmark' color={isBookmarked ? 'black' : ''} />
          <span>{isBookmarked ? `${clipCount + 1}` : `${clipCount}`}</span>
        </div>
      </button>
      <Button variant='default'>응모하기</Button>
    </div>
  );
};

export default ParticipateButton;
