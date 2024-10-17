const colors = ['zinc', 'red', 'green', 'blue', 'brand'] as const;
const colorVariants = [
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
] as const;
type ColorVariants = (typeof colorVariants)[number];
type ColorNames = (typeof colors)[number];

type White = 'white';
type Black = 'black';
type BrandVariants = '100' | '200' | '300';
type Colors =
  | `${Exclude<ColorNames, 'brand'>}${ColorVariants}`
  | `brand${BrandVariants}`
  | White
  | Black;

const colorStyles: Record<Colors, string> = {
  zinc100: 'text-zinc-100',
  zinc200: 'text-zinc-200',
  zinc300: 'text-zinc-300',
  zinc400: 'text-zinc-400',
  zinc500: 'text-zinc-500',
  zinc600: 'text-zinc-600',
  zinc700: 'text-zinc-700',
  zinc800: 'text-zinc-800',
  zinc900: 'text-zinc-900',

  red100: 'text-red-100',
  red200: 'text-red-200',
  red300: 'text-red-300',
  red400: 'text-red-400',
  red500: 'text-red-500',
  red600: 'text-red-600',
  red700: 'text-red-700',
  red800: 'text-red-800',
  red900: 'text-red-900',

  green100: 'text-green-100',
  green200: 'text-green-200',
  green300: 'text-green-300',
  green400: 'text-green-400',
  green500: 'text-green-500',
  green600: 'text-green-600',
  green700: 'text-green-700',
  green800: 'text-green-800',
  green900: 'text-green-900',

  blue100: 'text-blue-100',
  blue200: 'text-blue-200',
  blue300: 'text-blue-300',
  blue400: 'text-blue-400',
  blue500: 'text-blue-500',
  blue600: 'text-blue-600',
  blue700: 'text-blue-700',
  blue800: 'text-blue-800',
  blue900: 'text-blue-900',

  brand100: 'text-brand-100',
  brand200: 'text-brand-200',
  brand300: 'text-brand-300',

  white: 'text-white',
  black: 'text-black',
} as const;

const colorList = Object.keys(colorStyles) as Colors[];

export {colorStyles, colorList};
export type {Colors};
