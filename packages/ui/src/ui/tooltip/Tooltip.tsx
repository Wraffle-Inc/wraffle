import * as React from "react";
import { Button } from "@/ui/button/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipArrow,
} from "./CustomTooltip";

const TooltipDemo = ({ children }: { children: string }) => {
  return (
    <TooltipProvider skipDelayDuration={0} delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="default">Hover</Button>
        </TooltipTrigger>
        <TooltipContent>
          {children}
          <TooltipArrow />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export { TooltipDemo };
