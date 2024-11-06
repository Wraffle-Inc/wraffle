import {RecentRaffles} from '@/entities/banner/constants';
import {categories} from '@/entities/category/constants';
import {recommendItems} from '@/entities/raffle/recommend/constants';
import Banner from '@/features/manage-raffle/ui/Banner';
import {Header} from '@/shared/ui';
import CategoryButtons from '@/widgets/category-list/ui/CategoryButtons';
import RecommendList from '@/widgets/recommend-list/ui/RecommendList';
import {BottomNavigation, Icon} from '@wraffle/ui';

export default function Home() {
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
        <Banner recentRaflle={RecentRaffles} />
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
