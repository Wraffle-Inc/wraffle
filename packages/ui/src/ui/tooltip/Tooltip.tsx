import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
  TooltipArrow,
} from './PrimitiveTooltip';
import {Button} from '@wds/ui/button/Button';

const TooltipDemo = ({children}: {children: string}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='default'>Hover</Button>
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent>
            {children}
            <TooltipArrow />
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  );
};

export {TooltipDemo};
