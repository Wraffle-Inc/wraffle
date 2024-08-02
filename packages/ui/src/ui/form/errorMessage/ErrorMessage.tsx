"use client";

import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/shared/utils";

const errorMessageVariants = cva(
  "text-sm text-[#FA5252] font-medium text-destructive"
);

export interface ErrorMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof errorMessageVariants> {
  isError: boolean;
}

const ErrorMessage = React.forwardRef<HTMLParagraphElement, ErrorMessageProps>(
  ({ className, isError = true, children, ...props }, ref) => {
    return (
      <p ref={ref} className={cn(errorMessageVariants(), className)} {...props}>
        {isError ? children : ""}
      </p>
    );
  }
);
ErrorMessage.displayName = "ErrorMessage";

export { ErrorMessage };
