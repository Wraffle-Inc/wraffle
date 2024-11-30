import {categories} from '@/entities/category';
import {RecentRaffles} from '@/features/manage-raffle/config';
import {Banner} from '@/features/manage-raffle/ui';
import apiClient from '@/shared/api/apiClient';
import {Header} from '@/shared/ui';
import {CategoryButtons} from '@/widgets/category-list/ui';
import {recommendItems} from '@/widgets/recommend-list/config';
import {RecommendList} from '@/widgets/recommend-list/ui';
import {BottomNavigation, Icon} from '@wraffle/ui';

export default async function Home() {
  await apiClient.get('/raffles/recent', {withAuth: true});

  return (
    <main className='h-auto pb-16'>
      <Header withUnderline>
        <Header.Left>
          <Header.Logo />
        </Header.Left>
        <Header.Right>
          <Icon name='bell' />
        </Header.Right>
      </Header>
      <section className='my-4'>
        <Banner recentRaffle={RecentRaffles} />
      </section>
      <section className='mb-4 flex justify-center'>
        <CategoryButtons categories={categories} />
      </section>
      <section className='flex justify-center'>
        <RecommendList recommendItems={recommendItems} />
      </section>
      <BottomNavigation />
    </main>
  );
}
