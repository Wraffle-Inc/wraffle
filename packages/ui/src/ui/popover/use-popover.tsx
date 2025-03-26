import {Popover, PopoverContent, PopoverTrigger} from './Popover';
import React, {useState} from 'react';

const PopoverContext = React.createContext<{
  content: React.ReactNode;
  openPopover: (content: React.ReactNode) => void;
  closePopover: () => void;
}>({
  content: null,
  openPopover: () => {},
  closePopover: () => {},
});

interface PopoverProviderProps {
  children: React.ReactNode;
}

export const PopoverProvider = ({children}: PopoverProviderProps) => {
  const [content, setContent] = useState<React.ReactNode>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openPopover = (newContent: React.ReactNode) => {
    setContent(newContent);
    setIsOpen(true);
  };

  const closePopover = () => {
    setIsOpen(false);
  };

  return (
    <PopoverContext.Provider value={{content, openPopover, closePopover}}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger>{children}</PopoverTrigger>
        <PopoverContent>{content}</PopoverContent>
      </Popover>
    </PopoverContext.Provider>
  );
};

export const usePopover = () => {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error('usePopover must be used within a PopoverProvider');
  }
  return context;
};
