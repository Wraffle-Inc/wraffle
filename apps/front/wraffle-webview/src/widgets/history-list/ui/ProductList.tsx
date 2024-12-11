import {EmptyInfo} from '@/shared/ui/EmptyInfo/EmptyInfo';

interface EmptyInfoProps {
  description: string;
  href: string;
  linkLabel: string;
}

interface ProductListProps<T> {
  products: T[];
  block: (product: T) => React.ReactNode;
  emptyInfo: EmptyInfoProps;
}

export const ProductList = <T,>({
  products,
  block,
  emptyInfo,
}: ProductListProps<T>) => (
  <>
    {products.length > 0 ? (
      products.map(product => block(product))
    ) : (
      <EmptyInfo
        description={emptyInfo.description}
        href={emptyInfo.href}
        linkLabel={emptyInfo.linkLabel}
      />
    )}
  </>
);
