'use client';

import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {Header} from '@/shared/ui';
import {BottomNavigation, Typography, Icon} from '@wraffle/ui';

const SearchPage = () => {
  const router = useRouter();
  const [keywords, setKeywords] = useState<string[]>([
    '당일 마감',
    'Vans',
    '티셔츠',
    'Stussy',
    'Carhartt',
    '행사',
  ]);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className='flex min-h-screen flex-col'>
      <div className='sticky top-0 z-20 bg-white'>
        <Header>
          <Header.Left>
            <div className='mt-6'>
              <Header.BackButton onClick={router.back} />
            </div>
          </Header.Left>
          <Header.Right>
            <div className='flex w-full justify-end'>
              <Icon name='shopping-box' showBadge badgeCount={2} />
            </div>
          </Header.Right>
        </Header>
      </div>

      <section className='px-4'>
        <div className='relative mt-4'>
          <input
            type='text'
            placeholder='검색어를 입력해주세요.'
            className={`w-full rounded-md border border-zinc-300 px-5 py-3 font-light text-zinc-700 placeholder:text-zinc-400 focus:outline-none ${
              isFocused ? 'placeholder:opacity-0' : 'placeholder:opacity-100'
            }`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <Icon
            name='search'
            className='absolute right-3 top-1/2 mr-2 -translate-y-1/2 transform'
          />
        </div>

        <section className='mt-7 flex flex-col'>
          <section className='mb-7 flex flex-col'>
            <Typography className='mb-4 font-semibold' size='h4' color='black'>
              추천 검색어
            </Typography>
            {keywords.length > 0 ? (
              <div className='flex flex-wrap gap-2'>
                {keywords.map((keyword, index) => (
                  <div
                    key={index}
                    className='inline-block rounded-full border-none bg-[#F9FAFB] px-3 py-2 text-sm text-gray-700'
                  >
                    # {keyword}
                  </div>
                ))}
              </div>
            ) : (
              <Typography className='font-light' size='h6' color='black'>
                아직 추천 검색어가 없어요.
              </Typography>
            )}
          </section>

          <hr className='mb-4 border-[0.5px] border-zinc-200' />
          <section className='mt-4 flex flex-col'>
            <Typography className='mb-4 font-semibold' size='h4' color='black'>
              가장 많이 검색하고 있어요!
            </Typography>
            <ul className='list-decimal'>
              {['당일 마감', 'Vans', 'A/S', '아무거나', '행사'].map(
                (item, index) => (
                  <li key={index} className='mb-4 flex'>
                    <Typography size='p3' color='zinc400' className='mr-4'>
                      {index + 1}
                    </Typography>{' '}
                    <Typography size='p3' color='black'>
                      {item}
                    </Typography>{' '}
                  </li>
                ),
              )}
            </ul>
          </section>
        </section>
      </section>
      <BottomNavigation />
    </div>
  );
};

export default SearchPage;
