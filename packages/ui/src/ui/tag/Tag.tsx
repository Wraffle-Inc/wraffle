import * as React from "react";

const Tag = ({ children }: { children: string }) => {
  return (
    <div
      className={
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-[#F4F4F5] text-[#3F3F46] px-1.5 py-1 gap-2.5"
      }
    >
      # {children}
    </div>
  );
};

export { Tag };
