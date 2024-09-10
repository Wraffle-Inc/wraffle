import {useState} from 'react';

type MenuOption = '상품' | '응모 기간' | '당첨자 발표' | '유의사항';

export const useMenu = (initialMenu: MenuOption) => {
  const [selectedMenu, setSelectedMenu] = useState<MenuOption>(initialMenu);

  const selectMenu = (menu: MenuOption) => {
    setSelectedMenu(menu);
  };

  return {
    selectedMenu,
    selectMenu,
  };
};
