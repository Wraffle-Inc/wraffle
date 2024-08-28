'use client';

import {Button} from '../button/Button';
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './Dialog';
import * as React from 'react';
import {DialogTrigger} from '@radix-ui/react-dialog';
import {cn} from '@wds/shared/utils';

type DialogProps = {
  title: React.ReactNode;
  description: React.ReactNode;
  footer?: [string] | [string, string];
  withCloseButton?: boolean;
  justify?: 'center' | 'left';
};

type DialogState = {
  props: DialogProps;
  isOpen: boolean;
};

const INITIAL_STATE: DialogState = {
  props: {
    title: '',
    description: '',
    footer: undefined,
    withCloseButton: false,
    justify: 'left',
  },
  isOpen: false,
};

const DialogContext = React.createContext<{
  state: DialogState;
  openDialog: (props: DialogProps) => void;
  closeDialog: () => void;
}>({
  state: INITIAL_STATE,
  openDialog: () => {},
  closeDialog: () => {},
});

interface DialogProviderProps {
  children: React.ReactNode;
}

export const DialogProvider = ({children}: DialogProviderProps) => {
  const [state, setState] = React.useState<DialogState>(INITIAL_STATE);

  const openDialog = (props: DialogProps) => {
    setState({props, isOpen: true});
  };

  const closeDialog = () => {
    setState(INITIAL_STATE);
  };

  return (
    <DialogContext.Provider value={{state, openDialog, closeDialog}}>
      <Dialog
        open={state.isOpen}
        onOpenChange={isOpen => !isOpen && closeDialog()}
      >
        {!state.isOpen && <DialogTrigger>{children}</DialogTrigger>}
        <DialogContent withCloseButton={state.props.withCloseButton}>
          <DialogHeader
            className={cn(
              state.props.justify === 'center'
                ? 'justify-center'
                : 'justify-start',
            )}
          >
            <DialogTitle>{state.props.title}</DialogTitle>
            <DialogDescription>{state.props.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter className='flex gap-1'>
            {state.props.footer?.map((text, index) => (
              <DialogClose asChild key={index}>
                <Button>{text}</Button>
              </DialogClose>
            ))}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog는 DialogProvider 안에서 사용해야 합니다.');
  }
  return context;
};
