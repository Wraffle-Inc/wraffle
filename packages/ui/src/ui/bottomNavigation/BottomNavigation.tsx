'use client';

import IconWithLabel from '../iconWithLabel/IconWithLabel';
import {useState} from 'react';
import type {IconNameTypes} from '@wds/ui/icon/Icon';
import {Icon} from '@wds/ui/icon/Icon';

type ItemType = {
  name: IconNameTypes;
  label: string;
};

const menuItems: ItemType[] = [
  {name: 'menu', label: '카테고리'},
  {name: 'search', label: '검색'},
  {name: 'home', label: '홈'},
  {name: 'gift', label: '래플'},
  {name: 'user-circle', label: '내정보'},
];

export default function BottomNavigation() {
  const [selectedIcon, setSelectedIcon] = useState<string>('홈');

  const handleClickIcon = (label: string) => {
    setSelectedIcon(label);
  };

  const isSelectedIcon = (label: string) => {
    return selectedIcon === label;
  };

  return (
    <div className='fixed bottom-0 left-0 z-50 w-full border-t bg-[#F9FAFB]'>
      <nav className='flex justify-around py-3'>
        {menuItems.map(({name, label}) => (
          <IconWithLabel
            key={label}
            label={label}
            Icon={<Icon name={name} />}
            strokeColor={
              isSelectedIcon(label) ? 'text-black' : 'text-[#71717A]'
            }
            onClick={() => handleClickIcon(label)}
          />
        ))}
      </nav>
    </div>
  );
}
