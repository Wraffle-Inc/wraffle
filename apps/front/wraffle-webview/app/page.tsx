import {categories} from '@/entities/category';
import {RecentRaffles} from '@/features/manage-raffle/config';
import {Banner} from '@/features/manage-raffle/ui';
import {Header} from '@/shared/ui';
import {CategoryButtons} from '@/widgets/category-list';
import {NotificationIcon} from '@/widgets/notification-list/ui';
import {recommendItems} from '@/widgets/recommend-list/config';
import {RecommendList} from '@/widgets/recommend-list/ui';
import {BottomNavigation} from '@wraffle/ui';

export default function Home() {
  return (
    <main className='h-auto pb-16'>
      <Header withUnderline>
        <Header.Left>
          <Header.Logo />
        </Header.Left>
        <Header.Right>
          <NotificationIcon path='/notification' />
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
