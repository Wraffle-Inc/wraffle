import type {ReactNode} from 'react';
import React from 'react';
import {BottomNavigation} from '@wraffle/ui/src/ui/bottomNavigation/BottomNavigation';

type Props = {
  children: ReactNode;
};

export default function Layout({children}: Props) {
  return (
    <>
      <main>
        {children}
        <BottomNavigation />
      </main>
    </>
  );
}
