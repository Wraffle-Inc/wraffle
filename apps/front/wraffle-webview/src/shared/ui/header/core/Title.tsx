import type {TypographyProps} from '@wraffle/ui';
import {Typography} from '@wraffle/ui';

interface TitleProps extends TypographyProps {
  children: string;
}

export const Title = ({children, size = 'h4', ...props}: TitleProps) => {
  return (
    <Typography size={size} {...props}>
      {children}
    </Typography>
  );
};
