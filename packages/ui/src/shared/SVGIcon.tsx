export type SvgIconId = 'menu' | 'search' | 'home' | 'gift' | 'user';

interface SvgIconProps {
  id: string;
  width?: number | string;
  height?: number | string;
}

const SVGIcon = ({ id, width = 20, height = 20 }: SvgIconProps) => (
  <svg fill="none" width={width} height={height}>
    <use href={`/icon.svg#icon-${id}`} />
  </svg>
);

export default SVGIcon;
