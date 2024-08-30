'use client';

import type {ReactNode} from 'react';
import React from 'react';
import {ProductInfoMenu} from '@/widgets/product-info';

type Props = {
  children: ReactNode;
};

export default function Layout({children}: Props) {
  const [selectedMenu, setSelectedMenu] = React.useState<string>('상품'); // 선택된 메뉴 상태 관리

  return (
    <>
      <header className='mb-[25px] mt-[25px] h-[56px] bg-slate-700' />

      <ProductInfoMenu
        selectedMenu={selectedMenu}
        onSelectMenu={setSelectedMenu}
      />

      <main>{children}</main>
    </>
  );
}
