import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils";

const roundButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-not-allowed",
  {
    variants: {
      selected: {
        true: "bg-primary text-white", // 선택된 상태
        false: "bg-[#F4F4F5] text-[#52525B]", // 비선택된 상태
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
);

export interface RoundButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof roundButtonVariants> {
  selected: boolean;
}

const RoundButton = React.forwardRef<HTMLButtonElement, RoundButtonProps>(
  ({ className, selected, ...props }, ref) => {
    return (
      <button
        className={cn(
          roundButtonVariants({ selected }),
          "px-3 py-1.5",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

RoundButton.displayName = "RoundButton";

export { RoundButton, roundButtonVariants };
