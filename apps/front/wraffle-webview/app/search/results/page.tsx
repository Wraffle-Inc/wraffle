'use client';

import {useRouter} from 'next/navigation';
import {Header} from '@/shared/ui';
import {Typography} from '@wraffle/ui';
import {RaffleCard} from '@wraffle/ui';
import {Icon} from '@wraffle/ui';

const SearchResultsPage = () => {
  const router = useRouter();

  return (
    <div className='flex min-h-screen flex-col'>
      <Header>
        <Header.Left>
          <div className=''>
            <Header.BackButton onClick={router.back} />
          </div>
        </Header.Left>
        <Header.Right>
          <div className='flex w-full justify-end'>
            <Icon name='shopping-box' showBadge badgeCount={2} />
          </div>
        </Header.Right>
      </Header>

      <section className='flex flex-row pt-4'>
        <Typography className='pr-2' size='h3' color='black'>
          '당일 마감'
        </Typography>
        <Typography size='h3' color='zinc500'>
          검색 결과
        </Typography>
      </section>

      <div className='grid grid-cols-2 justify-items-center gap-16 p-4'>
        <RaffleCard
          hashtags={[
            {
              id: 1,
              name: '한정판',
            },
            {
              id: 2,
              name: 'Vans',
            },
          ]}
          isBookmarked
          name='[Vans] 올드스쿨'
          price='78,000'
          scrapCount={3100}
          thumbnailUrl='https://shorturl.at/HMedV'
        />
        <RaffleCard
          hashtags={[
            {
              id: 1,
              name: '한정판',
            },
            {
              id: 2,
              name: 'Vans',
            },
          ]}
          isBookmarked
          name='[Vans] 올드스쿨'
          price='78,000'
          scrapCount={3100}
          thumbnailUrl='https://shorturl.at/HMedV'
        />
        <RaffleCard
          hashtags={[
            {
              id: 1,
              name: '한정판',
            },
            {
              id: 2,
              name: 'Vans',
            },
          ]}
          isBookmarked
          name='[Vans] 올드스쿨'
          price='78,000'
          scrapCount={3100}
          thumbnailUrl='https://shorturl.at/HMedV'
        />
      </div>
    </div>
  );
};

export default SearchResultsPage;
