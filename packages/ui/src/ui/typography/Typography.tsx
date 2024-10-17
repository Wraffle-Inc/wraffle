import type {Colors} from './prop/color.prop';
import {colorStyles} from './prop/color.prop';
import type {As, Sizes} from './prop/text.prop';
import {getTypographyClassName} from './util/typo';
import * as React from 'react';
import {Slot} from '@radix-ui/react-slot';
import {cn} from '@wds/shared/utils';

type TextElement = React.ElementRef<'span'>;

interface TypographyProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: As;
  size?: Sizes;
  color?: Colors;
  asChild?: boolean;
  children: React.ReactNode;
}

export const Typography = React.forwardRef<TextElement, TypographyProps>(
  (
    {
      as: Tag = 'span',
      size = 'p1',
      color = 'zinc900',
      asChild = false,
      children,
      ...textProps
    },
    forwardedRef,
  ) => {
    return (
      <Slot
        data-accent-color={color}
        className={cn(getTypographyClassName(size), colorStyles[color])}
        {...textProps}
        ref={forwardedRef}
      >
        {asChild ? children : <Tag>{children}</Tag>}
      </Slot>
    );
  },
);

Typography.displayName = 'Typography';

export type {TypographyProps};
