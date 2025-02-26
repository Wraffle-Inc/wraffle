import './globals.css';
import MockProvider from './mocks/provider';
import ReactQueryProvider from './provider/ReactQueryProvider';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {ReactNode} from 'react';
import IconLoader from '@wraffle/ui/src/ui/icon/IconLoader';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Wraffle Admin',
  description: 'Wraffle Admin',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  sidebar,
  content,
}: {
  sidebar: ReactNode;
  content: ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='flex h-screen w-screen flex-row bg-white'>
          {IconLoader}
          {sidebar}
          <MockProvider>
            <ReactQueryProvider>{content}</ReactQueryProvider>
          </MockProvider>
        </div>
      </body>
    </html>
  );
}
