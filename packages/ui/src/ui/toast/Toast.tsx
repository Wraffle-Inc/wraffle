'use client';

import {cva, type VariantProps} from 'class-variance-authority';
import * as React from 'react';
import {FaCheckCircle} from 'react-icons/fa';
import {IoMdCloseCircle} from 'react-icons/io';
import {MdClose} from 'react-icons/md';
import {cn} from '@/shared/utils';
import * as ToastPrimitives from '@radix-ui/react-toast';

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({className, ...props}, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      'top-10% sm:top-10% fixed left-1/2 z-[100] flex w-[320px] -translate-x-1/2 transform flex-col-reverse p-4 sm:left-1/2 sm:-translate-x-1/2 sm:transform sm:flex-col',
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  'group pointer-events-auto relative flex w-[320px] h-[52px] items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-y-[var(--radix-toast-swipe-end-y)] data-[swipe=move]:translate-y-[var(--radix-toast-swipe-move-y)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-top-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        success: 'border bg-green-5 text-white',
        info: 'border bg-blue-5 text-white',
        warning: 'border bg-red-5 text-white',
      },
    },
    defaultVariants: {
      variant: 'success',
    },
  },
);

const toastIconVariants = cva('h-4 w-4', {
  variants: {
    variant: {
      success: 'text-green-4',
      info: 'text-blue-4',
      warning: 'text-red-4',
    },
  },
});

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants> & {icon?: 'check' | 'close'}
>(({className, variant, icon, ...props}, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({variant}), className)}
      {...props}
    >
      <div className='flex items-center justify-center gap-2.5'>
        {icon === 'check' && (
          <FaCheckCircle className={cn(toastIconVariants({variant}))} />
        )}
        {icon === 'close' && (
          <IoMdCloseCircle className={cn(toastIconVariants({variant}))} />
        )}
        {props.children}
      </div>
    </ToastPrimitives.Root>
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const closeIconVariants = cva('h-4 w-4', {
  variants: {
    variant: {
      success: 'text-green-4',
      info: 'text-blue-4',
      warning: 'text-red-4',
    },
  },
});

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close> & {
    variant: 'success' | 'info' | 'warning';
  }
>(({className, variant, ...props}, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      'absolute right-4 top-4 cursor-pointer rounded-md text-foreground/50 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none group-hover:opacity-100',
      className,
    )}
    toast-close=''
    {...props}
  >
    <MdClose scale={20} className={cn(closeIconVariants({variant}))} />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const titleVariants = cva('text-sm font-semibold [&+div]:text-xs', {
  variants: {
    variant: {
      success: 'text-green-4',
      info: 'text-blue-4',
      warning: 'text-red-2',
    },
  },
  defaultVariants: {
    variant: 'success',
  },
});

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title> & {
    variant: 'success' | 'info' | 'warning';
  }
>(({className, variant, ...props}, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn(titleVariants({variant}), className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({className, ...props}, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast> & {
  icon?: 'check' | 'close';
};

export {
  type ToastProps,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
};
