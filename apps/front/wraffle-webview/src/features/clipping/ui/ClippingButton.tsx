'use client';

import {createClipping} from '../api/createClipping';
import {deleteClipping} from '../api/deleteClipping';
import {useState} from 'react';
import {Icon} from '@wraffle/ui';

interface ClippingButtonProps {
  targetId: number;
  type: 'RAFFLE' | 'EVENT';
  clipCount: number;
  isInitiallyClipped?: boolean;
}

interface ApiError {
  status: number;
  code?: string;
  message?: string;
  digest?: string;
}

export const ClippingButton = ({
  targetId,
  type,
  clipCount,
  isInitiallyClipped = false,
}: ClippingButtonProps) => {
  const [isBookmarked, setIsBookmarked] = useState(isInitiallyClipped);
  const [count, setCount] = useState(clipCount);

  const handleBookmark = async () => {
    try {
      if (isBookmarked) {
        await deleteClipping({
          id: targetId,
          type,
        });

        setIsBookmarked(false);
        setCount(prev => Math.max(prev - 1, 0));
        return;
      }

      await createClipping({targetId, type});

      setIsBookmarked(true);
      setCount(prev => prev + 1);
    } catch (err) {
      const error = err as ApiError;

      if (error.status === 409 && error.code === 'CL03') {
        alert('이미 클리핑된 상태입니다.');
        setIsBookmarked(true);
      } else {
        console.error('클리핑 오류:', error);
        alert('클리핑 처리에 실패했습니다.');
      }
    }
  };

  return (
    <button onClick={handleBookmark}>
      <div className='flex flex-col items-center justify-center'>
        <Icon name='bookmark' color={isBookmarked ? 'black' : ''} />
        <span>{count}</span>
      </div>
    </button>
  );
};
