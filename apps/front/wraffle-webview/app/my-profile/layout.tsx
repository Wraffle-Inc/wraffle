import type {ReactNode} from 'react';
import React from 'react';
import Footer from '@/widgets/my-profile/ui/Footer';
import BottomNavigation from '@wraffle/ui/src/ui/bottomNavigation/BottomNavigation';

type Props = {
  children: ReactNode;
};

export default function Layout({children}: Props) {
  return (
    <>
      <main>
        {children}
        <Footer />

        <BottomNavigation />
      </main>
    </>
  );
}
