import './globals.css';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
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
  sidebar: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='flex h-screen w-screen flex-row bg-white'>
          {IconLoader}
          {sidebar}
          {content}
        </div>
      </body>
    </html>
  );
}
