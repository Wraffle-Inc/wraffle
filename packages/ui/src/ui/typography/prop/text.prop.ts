const sizes = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p1',
  'p2',
  'p3',
  'p4',
  'sm1',
  'sm2',
] as const;

type Sizes = (typeof sizes)[number];

const as = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'span',
  'div',
  'p',
  'label',
] as const;

type As = (typeof as)[number];

export {as, sizes};
export type {As, Sizes};
