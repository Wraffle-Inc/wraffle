'use client';

import IconWithLabel from '../iconWithLabel/IconWithLabel';
import {useState} from 'react';
import type {SvgIconId} from '@wds/ui/icon/SVGIcon';
import {SVGIcon} from '@wds/ui/icon/SVGIcon';

type ItemType = {
  id: SvgIconId;
  label: string;
};

const menuItems: ItemType[] = [
  {id: 'menu', label: '카테고리'},
  {id: 'search', label: '검색'},
  {id: 'home', label: '홈'},
  {id: 'gift', label: '래플'},
  {id: 'user-circle', label: '내정보'},
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
        {menuItems.map(({id, label}) => (
          <IconWithLabel
            key={label}
            label={label}
            Icon={<SVGIcon id={id} />}
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
