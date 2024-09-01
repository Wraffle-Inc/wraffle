import clsx from 'clsx';
import type {SVGAttributes} from 'react';

export type IconNameTypes =
  | 'arrow-bottom'
  | 'arrow-right'
  | 'arrow-left'
  | 'menu'
  | 'search'
  | 'home'
  | 'gift'
  | 'user-circle'
  | 'cart'
  | 'shopping-box'
  | 'setting'
  | 'plus'
  | 'bell'
  | 'bookmark'
  | 'bookmark-fill'
  | 'heart'
  | 'heart-fill'
  | 'user'
  | 'credit-card'
  | 'upload'
  | 'calendar'
  | 'write';

type IconProps = {
  name: IconNameTypes;
  color?: string;
  width?: number | string;
  height?: number | string;
  showBadge?: boolean;
  badgeCount?: number;
} & SVGAttributes<SVGSVGElement>;

export const Icon = ({
  name,
  color = 'none',
  width = 20,
  height = 20,
  showBadge = false,
  badgeCount = 0,
  ...props
}: IconProps) => (
  <div className={clsx(showBadge && 'absolute')}>
    <svg fill={color} width={width} height={height} {...props}>
      <use href={`#${name}`} />
    </svg>
    {showBadge && (
      <div
        className={clsx(
          'absolute flex items-center justify-center rounded-full bg-red-500 text-xs text-white',
          badgeCount > 0
            ? '-right-2 -top-2 h-4 w-4'
            : '-right-1 -top-1 h-2 w-2',
        )}
      >
        {badgeCount > 0 && badgeCount}
      </div>
    )}
  </div>
);
