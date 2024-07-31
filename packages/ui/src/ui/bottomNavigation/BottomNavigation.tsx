import { useState } from 'react';

import IconWithLabel from '../iconWithLabel/IconWithLabel';
import SVGIcon from '@/shared/SVGIcon';

const menuItems = [
  { id: 'menu', label: '카테고리' },
  { id: 'search', label: '검색' },
  { id: 'home', label: '홈' },
  { id: 'gift', label: '래플' },
  { id: 'user', label: '내정보' },
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
    <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-[#F9FAFB]">
      <nav className="flex justify-around py-3">
        {menuItems.map(({ id, label }) => (
          <IconWithLabel
            key={label}
            label={label}
            Icon={<SVGIcon id={id} width={20} height={20} />}
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
