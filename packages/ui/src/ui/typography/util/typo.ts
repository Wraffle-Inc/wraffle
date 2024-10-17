import type {Sizes} from '../prop/text.prop';

interface TypographyStyle {
  fontSize: number;
  lineHeight: number;
  fontWeight: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
}

export const TYPO_MAP: Record<Sizes, TypographyStyle> = {
  h1: {
    fontSize: 32,
    lineHeight: 1.4,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 24,
    lineHeight: 1.4,
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 20,
    lineHeight: 1.4,
    fontWeight: 'semibold',
  },
  h4: {
    fontSize: 17,
    lineHeight: 1.4,
    fontWeight: 'semibold',
  },
  h5: {
    fontSize: 16,
    lineHeight: 1.4,
    fontWeight: 'semibold',
  },
  h6: {
    fontSize: 15,
    lineHeight: 1.4,
    fontWeight: 'semibold',
  },
  p1: {
    fontSize: 16,
    lineHeight: 1.4,
    fontWeight: 'semibold',
  },
  p2: {
    fontSize: 14,
    lineHeight: 1.4,
    fontWeight: 'semibold',
  },
  p3: {
    fontSize: 14,
    lineHeight: 1.4,
    fontWeight: 'normal',
  },
  p4: {
    fontSize: 13,
    lineHeight: 1.4,
    fontWeight: 'normal',
  },
  sm1: {
    fontSize: 12,
    lineHeight: 1.4,
    fontWeight: 'semibold',
  },
  sm2: {
    fontSize: 10,
    lineHeight: 1.4,
    fontWeight: 'semibold',
  },
};

const getTypographyStyle = (sizes: Sizes) => TYPO_MAP[sizes];
export const getTypographyClassName = (sizes: Sizes): string => {
  const {fontSize, fontWeight} = getTypographyStyle(sizes);
  return `text-[${fontSize}px] leading-normal font-${fontWeight}`;
};
