'use client';

import clsx from 'clsx';
import {useRef} from 'react';
import {ChipButton} from '@wraffle/ui';

export const HistoryList = <T,>({
  raffles,
  events,
  activeTab,
  setActiveTab,
  categoryList,
  category,
  setCategory,
  BlockComponent,
}: {
  raffles: T[];
  events: T[];
  activeTab: number;
  setActiveTab: (activeTab: number) => void;
  categoryList: string[];
  category: string;
  setCategory: (category: string) => void;
  BlockComponent: React.ComponentType<{product: T}>;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.offsetWidth;

    const newTabIndex = Math.round(scrollLeft / containerWidth);
    if (newTabIndex !== activeTab) {
      setActiveTab(newTabIndex);
    }
  };

  const handleTabClick = (index: number) => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        left: index * container.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <div className='flex h-12'>
        <button
          value='raffle'
          onClick={() => handleTabClick(0)}
          className={clsx(
            'w-full border-b-2 text-base text-[#333D4B]',
            activeTab === 0
              ? 'border-[#333D4B] font-bold'
              : 'border-[#E5E8EB] font-normal',
          )}
        >
          래플
        </button>
        <button
          value='event'
          onClick={() => handleTabClick(1)}
          className={clsx(
            'w-full border-b-2 text-base text-[#333D4B]',
            activeTab === 1
              ? 'border-[#333D4B] font-bold'
              : 'border-[#E5E8EB] font-normal',
          )}
        >
          이벤트
        </button>
      </div>

      <div
        ref={containerRef}
        className='mt-2 flex flex-1 snap-x snap-mandatory overflow-x-scroll scroll-smooth'
        onScroll={handleScroll}
      >
        {/* 래플 */}
        <div className='flex min-w-full snap-start flex-col text-black'>
          <div className='my-1 flex gap-2 pl-0.5'>
            {categoryList.map(chip => (
              <ChipButton
                key={chip}
                className='px-5'
                selected={category === chip}
                onClick={() => setCategory(chip)}
              >
                {chip}
              </ChipButton>
            ))}
          </div>

          {raffles.length > 0 ? (
            raffles.map((raffle, index) => (
              <BlockComponent key={index} product={raffle} />
            ))
          ) : (
            <div className='flex flex-col items-center justify-center py-10'>
              <p className='text-gray-500'>아직 내역이 없어요 🥶</p>
            </div>
          )}
        </div>

        {/* 이벤트 */}
        <div className='flex min-w-full snap-start flex-col text-black'>
          <div className='my-1 flex gap-2 pl-0.5'>
            {categoryList.map(chip => (
              <ChipButton
                key={chip}
                className='px-5'
                selected={category === chip}
                onClick={() => setCategory(chip)}
              >
                {chip}
              </ChipButton>
            ))}
          </div>

          {events.length > 0 ? (
            events.map((event, index) => (
              <BlockComponent key={index} product={event} />
            ))
          ) : (
            <div className='flex flex-col items-center justify-center py-10'>
              <p className='text-gray-500'>아직 내역이 없어요 🥶</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
