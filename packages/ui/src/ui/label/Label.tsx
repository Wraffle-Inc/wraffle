import {Typography} from '../typography/Typography';
import type {Sizes} from '../typography/prop/text.prop';
import {cn} from '@wds/shared/utils';

interface LabelProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  size?: Sizes;
}

const Label = ({
  children,
  className,
  color = '#4338CA',
  size = 'sm1',
  ...props
}: LabelProps) => {
  return (
    <div
      className={cn(
        `flex items-center justify-center rounded px-[6px] py-1`,
        className,
      )}
      style={{backgroundColor: `${color}1A`}}
      {...props}
    >
      <Typography size={size} style={{color}} className={`text-[${color}]`}>
        {children}
      </Typography>
    </div>
  );
};

export {Label};
