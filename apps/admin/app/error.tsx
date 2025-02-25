'use client';

import {useEffect} from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled error caught by Error Boundary:', error);
  }, [error]);

  return (
    <div style={{padding: '2rem', textAlign: 'center'}}>
      <h2>문제가 발생했습니다.</h2>
      <p>죄송합니다. 페이지를 불러오는 중 오류가 발생했습니다.</p>
      <button onClick={reset} style={{marginTop: '1rem'}}>
        다시 시도하기
      </button>
    </div>
  );
}
