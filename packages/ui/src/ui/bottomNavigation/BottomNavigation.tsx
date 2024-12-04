'use client';

import IconWithLabel from '../iconWithLabel/IconWithLabel';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import type {IconNameTypes} from '@wds/ui/icon/Icon';
import {Icon} from '@wds/ui/icon/Icon';

type ItemType = {
  name: IconNameTypes;
  label: string;
  path: string;
};

// TODO: 내정보 제외한 아이콘들은 path를 추가해야 함
const menuItems: ItemType[] = [
  {name: 'menu', label: '카테고리', path: ''},
  {name: 'search', label: '검색', path: ''},
  {name: 'home', label: '홈', path: ''},
  {name: 'gift', label: '래플', path: ''},
  {name: 'user-circle', label: '내정보', path: '/my-profile'},
];

const BottomNavigation = () => {
  const [selectedIcon, setSelectedIcon] = useState<string>('홈');

  const handleClickIcon = ({label, path}: {label: string; path: string}) => {
    setSelectedIcon(label);
    localStorage.setItem('currentTab', label);
    router.push(path);
  };

  const isSelectedIcon = (label: string) => {
    return selectedIcon === label;
  };

  return (
    <div className='fixed bottom-0 left-0 z-50 w-full border-t bg-[#F9FAFB]'>
      <nav className='flex justify-around py-3'>
        {menuItems.map(({name, label, path}) => (
          <IconWithLabel
            key={label}
            label={label}
            Icon={<Icon name={name} />}
            className={isSelectedIcon(label) ? 'text-black' : 'text-[#71717A]'}
            onClick={() => handleClickIcon({label, path})}
          />
        ))}
      </nav>
    </div>
  );
};

export {BottomNavigation};
