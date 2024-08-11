import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils";

const baseStyles = "font-pretendard";

const typographyVariants = {
  h1: "text-h1 font-bold leading-[1.4]",
  h2: "text-h2 font-bold leading-[1.4]",
  h3: "text-h3 font-semibold leading-[1.4]",
  h4: "text-h4 font-semibold leading-[1.4]",
  h5: "text-h5 font-semibold leading-[1.4]",
  h6: "text-h6 font-semibold leading-[1.4]",
  p1: "text-p1 font-medium leading-[1.4]",
  p2: "text-p2 font-medium leading-[1.4]",
  p3: "text-p3 font-medium leading-[1.4]",
  p4: "text-p4 font-medium leading-[1.4]",
  sm1: "text-sm1 font-medium leading-[1.4]",
  sm2: "text-sm2 font-medium leading-[1.4]",
};

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant: keyof typeof typographyVariants;
  asChild?: boolean;
}

type Props = TypographyProps & React.RefAttributes<HTMLElement>;
export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    // const Comp = asChild ? Slot : "div";
    const Comp = asChild
      ? Slot<Props>
      : ["h1", "h2", "h3", "h4", "h5", "h6"].includes(variant)
        ? variant
        : "p";

    const classes = cn(baseStyles, typographyVariants[variant], className);
    return <Comp className={classes} ref={ref} {...props} />;
  }
);
Typography.displayName = "Typography";

export { typographyVariants };
