import {type RaffleMenu, type EventMenu} from '../config/const';
import {useState} from 'react';

export const useMenu = (initialMenu: RaffleMenu | EventMenu) => {
  const [selectedMenu, setSelectedMenu] = useState<RaffleMenu | EventMenu>(
    initialMenu,
  );

  const selectMenu = (menu: RaffleMenu | EventMenu) => {
    setSelectedMenu(menu);
  };

  return {
    selectedMenu,
    selectMenu,
  };
};
