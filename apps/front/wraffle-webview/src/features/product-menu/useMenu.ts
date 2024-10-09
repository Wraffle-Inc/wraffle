import {useState} from 'react';

type MenuOption = string;

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
