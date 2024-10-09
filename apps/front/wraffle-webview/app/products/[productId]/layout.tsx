import type {ReactNode} from 'react';
import React from 'react';

type Props = {
  children: ReactNode;
};

export default function Layout({children}: Props) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
