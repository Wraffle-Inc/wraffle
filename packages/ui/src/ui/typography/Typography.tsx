import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { colorStyles, sizeStyles } from '@wds/shared/utils/typography';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div' | 'p' | 'label';
  size?: keyof typeof sizeStyles;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  lineHeight?: string;
  textColor?: keyof typeof colorStyles;
  asChild?: boolean;
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      as = 'p',
      size = 'p1',
      weight = 'regular',
      lineHeight = '1.4',
      textColor = 'brand1',
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp: React.ElementType = asChild ? Slot : as;

    const sizeClass = size ? sizeStyles[size] : sizeStyles['p1'];
    const weightClass = weight ? `font-${weight}` : '';
    const colorClass = textColor ? colorStyles[textColor] : '';

    const finalClassName = [
      sizeClass,
      weightClass,
      colorClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const finalStyle = {
      lineHeight, 
      ...props.style, 
    };

    return <Comp className={finalClassName} ref={ref} style={finalStyle} {...props} />;
  }
);

Typography.displayName = 'Typography';