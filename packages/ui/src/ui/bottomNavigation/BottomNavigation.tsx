import { useState } from 'react';

import {
  HomeIcon,
  MenuIcon,
  SearchIcon,
  GiftIcon,
  UserIcon,
} from '@/shared/icons';

import IconWithLabel from '../iconWithLabel/IconWithLabel';

const menuItems = [
  { Icon: MenuIcon, label: '카테고리' },
  { Icon: SearchIcon, label: '검색' },
  { Icon: HomeIcon, label: '홈' },
  { Icon: GiftIcon, label: '래플' },
  { Icon: UserIcon, label: '내정보' },
];

export default function BottomNavigation() {
  const [selectedIcon, setSelectedIcon] = useState<string>('홈');

  const handleIconClick = (label: string) => {
    setSelectedIcon(label);
  };

  const isSelectedColor = (label: string) => {
    const text = selectedIcon === label ? 'text-black' : 'text-[#71717A]';
    const icon = selectedIcon === label ? '#000' : '#71717A';

    return { text, icon };
  };

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-[#F9FAFB]">
      <nav className="flex justify-around py-3">
        {menuItems.map(({ Icon, label }) => (
          <IconWithLabel
            key={label}
            Icon={
              <Icon
                className="w-5 h-5"
                storkeColor={isSelectedColor(label).icon}
              />
            }
            label={label}
            strokeColor={isSelectedColor(label).text}
            onClick={() => handleIconClick(label)}
          />
        ))}
      </nav>
    </div>
  );
}
