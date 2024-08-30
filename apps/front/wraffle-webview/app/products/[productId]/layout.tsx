import type {ReactNode} from 'react';
import ProductLayout from '@/pages/products/[productId]/layout';

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({children}: LayoutProps) {
  return <ProductLayout>{children}</ProductLayout>;
}
