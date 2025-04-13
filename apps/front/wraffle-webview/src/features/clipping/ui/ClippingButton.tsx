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
  initialClippingId?: number; // ✅ 클리핑 ID
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
  initialClippingId,
}: ClippingButtonProps) => {
  const [isBookmarked, setIsBookmarked] = useState(isInitiallyClipped);
  const [count, setCount] = useState(clipCount);
  const [clippingId, setClippingId] = useState<number | null>(
    initialClippingId ?? null,
  );

  const handleBookmark = async () => {
    try {
      if (isBookmarked) {
        if (!clippingId) {
          alert('클리핑 ID가 존재하지 않아 삭제할 수 없습니다.');
          return;
        }
        await deleteClipping(clippingId);
        setIsBookmarked(false);
        setCount(prev => Math.max(prev - 1, 0));
        setClippingId(null);
        return;
      }

      const res = await createClipping({targetId, type});
      setIsBookmarked(true);
      setCount(prev => prev + 1);
      setClippingId(res.data?.id ?? null);
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
