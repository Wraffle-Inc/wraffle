import {cva, type VariantProps} from 'class-variance-authority';
import * as React from 'react';
import {cn} from '@wds/shared/utils';

const chipButtonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium px-3 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-not-allowed',
  {
    variants: {
      selected: {
        true: 'bg-primary text-white',
        false: 'bg-[#F4F4F5] text-[#52525B]',
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

export interface ChipButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipButtonVariants> {
  selected: boolean;
}

const ChipButton = React.forwardRef<HTMLButtonElement, ChipButtonProps>(
  ({className, selected, ...props}, ref) => {
    return (
      <button
        className={cn(chipButtonVariants({selected}), className)}
        ref={ref}
        {...props}
      />
    );
  },
);

ChipButton.displayName = 'ChipButton';

export {ChipButton, chipButtonVariants};
