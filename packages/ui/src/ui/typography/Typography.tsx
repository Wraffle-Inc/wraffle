import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/shared/utils";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  asChild?: boolean;
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      fontSize = "p1",
      fontWeight,
      lineHeight,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp: React.ElementType = asChild
      ? Slot
      : ["h1", "h2", "h3", "h4", "h5", "h6"].includes(fontSize)
        ? (fontSize as React.ElementType)
        : "p";

    return (
      <Comp
        className={cn(
          `text-${fontSize}`,
          fontWeight && `font-${fontWeight}`,
          lineHeight && `leading-${lineHeight}`,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Typography.displayName = "Typography";
