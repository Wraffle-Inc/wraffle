'use client';

import IconWithLabel from '../iconWithLabel/IconWithLabel';
import {usePathname, useRouter} from 'next/navigation';
import type {IconNameTypes} from '@wds/ui/icon/Icon';
import {Icon} from '@wds/ui/icon/Icon';

type ItemType = {
  name: IconNameTypes;
  label: string;
  path: string;
};

// TODO: 내정보 제외한 아이콘들은 path를 수정해야 함
const menuItems: ItemType[] = [
  {name: 'menu', label: '카테고리', path: '/category'},
  {name: 'search', label: '검색', path: '/search'},
  {name: 'home', label: '홈', path: '/'},
  {name: 'gift', label: '래플', path: '/wraffle'},
  {name: 'user-circle', label: '내정보', path: '/my-profile'},
];

const BottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClickIcon = (path: string) => {
    router.push(path);
  };

  const isSelectedIcon = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }

    return pathname.startsWith(path);
  };

  return (
    <div className='fixed bottom-0 left-0 z-50 w-full border-t bg-[#F9FAFB]'>
      <nav className='flex justify-around py-3'>
        {menuItems.map(({name, label, path}) => (
          <IconWithLabel
            key={label}
            label={label}
            Icon={<Icon name={name} />}
            className={isSelectedIcon(path) ? 'text-black' : 'text-[#71717A]'}
            onClick={() => handleClickIcon(path)}
          />
        ))}
      </nav>
    </div>
  );
};

export {BottomNavigation};
