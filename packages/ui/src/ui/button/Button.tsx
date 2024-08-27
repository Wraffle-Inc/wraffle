import {cva, type VariantProps} from 'class-variance-authority';
import * as React from 'react';
import {cn} from '@/shared/utils';
import {Slot} from '@radix-ui/react-slot';

const buttonVariants = cva(
  'w-full px-6 py-3 gap-2.5 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[#F4F4F5] disabled:text-gray-800 disabled:border-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        gray: 'bg-gray-400 text-white hover:bg-gray-600',
        stroke:
          'ring-1 ring-[#18181B] ring-inset text-primary hover:bg-primary hover:text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant, asChild = false, disabled, ...props}, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Comp
          className={cn(buttonVariants({variant, className}), {
            'ring-0 ring-transparent': disabled, // 조건부 스타일: disabled 상태일 때 ring 스타일 제거
          })}
          ref={ref}
          disabled={disabled}
          {...props}
        />
      </div>
    );
  },
);
Button.displayName = 'Button';

export {Button, buttonVariants};
