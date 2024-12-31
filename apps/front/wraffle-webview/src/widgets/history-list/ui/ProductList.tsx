import {Fragment} from 'react';
import {EmptyInfo} from '@/shared/ui/EmptyInfo/EmptyInfo';

interface EmptyInfoProps {
  description: string;
  href: string;
  linkLabel: string;
}

interface ProductListProps<T extends {id: number}> {
  products: T[];
  block: (product: T) => React.ReactNode;
  emptyInfo: EmptyInfoProps;
}

export const ProductList = <T extends {id: number}>({
  products,
  emptyInfo,
}: ProductListProps<T>) => (
  <>
    {products.length > 0 &&
      products.map(product => (
        <Fragment key={product.id}>block(product)</Fragment>
      ))}
    {products.length <= 0 && (
      <EmptyInfo
        description={emptyInfo.description}
        href={emptyInfo.href}
        linkLabel={emptyInfo.linkLabel}
      />
    )}
  </>
);
