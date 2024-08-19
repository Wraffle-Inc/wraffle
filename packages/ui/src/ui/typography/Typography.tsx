import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils";

const typographyVariants = cva("font-pretendard", {
  variants: {
    fontSize: {
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
    },
    fontWeight: {
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    lineHeight: {
      tight: "leading-tight",
    },
  },
  defaultVariants: {
    fontSize: "p1",
    fontWeight: "medium",
    lineHeight: "tight",
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    { className, fontSize, fontWeight, lineHeight, asChild = false, ...props },
    ref
  ) => {
    const Comp: React.ElementType = asChild
      ? Slot
      : ["h1", "h2", "h3", "h4", "h5", "h6"].includes(fontSize!)
        ? (fontSize as React.ElementType)
        : "p";

    return (
      <Comp
        className={cn(
          typographyVariants({ fontSize, fontWeight, lineHeight }),
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Typography.displayName = "Typography";

export { typographyVariants };
