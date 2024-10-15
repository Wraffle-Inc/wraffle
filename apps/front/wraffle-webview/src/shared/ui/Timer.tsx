import {memo, useEffect, useState} from 'react';

interface TimerProps {
  timerSecond: number;
}

const Timer = memo(({timerSecond}: TimerProps) => {
  const MINUTES_IN_MS = timerSecond * 1000;
  const INTERVAL = 1000;
  const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN_MS);

  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(
    2,
    '0',
  );
  const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - INTERVAL);
    }, INTERVAL);

    if (timeLeft <= 0) {
      clearInterval(timer);
      // !TODO: 타이머 종료 시 로직
    }

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  return (
    <div className='text-[#FA5252]'>
      {minutes} : {second}
    </div>
  );
});

export {Timer};
