'use client';

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@wds/ui/toast/Toast';
import {useToast} from '@wds/ui/toast/use-toast';

export const Toaster = () => {
  const {toasts} = useToast();

  return (
    <ToastProvider swipeDirection='up'>
      {toasts.map(function ({id, title, ...props}) {
        return (
          <Toast className='bg-white' key={id} {...props}>
            <div className='grid gap-1'>
              {title && (
                <ToastTitle variant={props.variant ?? 'success'}>
                  {title}
                </ToastTitle>
              )}
              {props.description && (
                <ToastDescription className='text-gray-600'>
                  {props.description}
                </ToastDescription>
              )}
            </div>

            <ToastClose variant={props.variant ?? 'success'} />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
};
