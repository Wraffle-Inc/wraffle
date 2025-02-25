import {Suspense} from 'react';
import {getCardListQueryOptions} from '@/features/card/config';
import {AddCard} from '@/features/card/ui';
import {PrefetchBoundary} from '@/shared/context/query/PrefetchBoundary';
import {Divider, Header} from '@/shared/ui';
import {CardList, SkeletonCardList} from '@/widgets/card-list/ui';
import {Typography} from '@wraffle/ui';

const CardPage = () => {
  return (
    <>
      <Header>
        <Header.Left>
          <Header.BackButton />
        </Header.Left>
        <Header.Middle>
          <Header.Title className='text-center'>내 카드 관리</Header.Title>
        </Header.Middle>
      </Header>
      <section className='flex w-full justify-center py-8'>
        <AddCard />
      </section>
      <Divider height={4} />
      <section className='px-6 py-3'>
        <Typography className='text-[#333D4B]' size='h4'>
          등록된 카드
        </Typography>
        <Suspense fallback={<SkeletonCardList />}>
          <PrefetchBoundary prefetchOptions={getCardListQueryOptions()}>
            <CardList />
          </PrefetchBoundary>
        </Suspense>
      </section>
    </>
  );
};

export default CardPage;
