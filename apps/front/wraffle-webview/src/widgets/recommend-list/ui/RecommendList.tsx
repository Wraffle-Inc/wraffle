import type {RecommendRaffle} from '@/features/manage-raffle/model';
import {RaffleCard, Typography} from '@wraffle/ui';

interface RecommendListProps {
  recommendItems: RecommendRaffle[];
}

const RecommendList = ({recommendItems}: RecommendListProps) => {
  return (
    <section className='w-full max-w-screen-md p-3'>
      <Typography as='h1' size='h2'>
        이번주 추천 래플
      </Typography>
      <div className='grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] justify-items-center gap-4'>
        {recommendItems.map(item => (
          <RaffleCard
            key={item.id}
            name={item.title}
            price={item.price}
            hashtags={item.hashtags}
            scrapCount={item.clipCount}
            thumbnailUrl={item.thumbnail}
            isBookmarked={item.isBookmarked}
          />
        ))}
      </div>
    </section>
  );
};

export {RecommendList};
