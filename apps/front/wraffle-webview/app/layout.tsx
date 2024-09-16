import './globals.css';
import type {Metadata} from 'next';
import {pretendard} from '@/shared/util/font';
import IconLoader from '@wraffle/ui/src/ui/icon/IconLoader';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${pretendard.variable} font-pretendard`}>
        <div className='container h-screen min-h-screen'>
          {IconLoader}
          {children}
        </div>
      </body>
    </html>
  );
}
