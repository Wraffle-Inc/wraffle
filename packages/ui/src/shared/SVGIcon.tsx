import clsx from 'clsx';

export type SvgIconId =
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

interface SvgIconProps {
  id: SvgIconId;
  width?: number | string;
  height?: number | string;
  badgeCount?: number;
  showBadge?: boolean;
}

const SVGIcon = ({
  id,
  width = 20,
  height = 20,
  badgeCount = 0,
  showBadge = false,
}: SvgIconProps) => (
  <div style={{ position: 'absolute' }}>
    <svg fill="none" width={width} height={height}>
      <use href={`/icon.svg#icon-${id}`} />
    </svg>
    {showBadge && (
      <div
        className={clsx(
          'absolute bg-red-500 rounded-full flex justify-center items-center text-white text-xs',
          badgeCount > 0 ? '-top-2 -right-2 w-4 h-4' : 'top-0 right-0 w-2 h-2'
        )}
      >
        {badgeCount > 0 && badgeCount}
      </div>
    )}
  </div>
);

export default SVGIcon;
