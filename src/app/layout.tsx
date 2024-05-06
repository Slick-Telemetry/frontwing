import clsx from 'clsx';
import { Provider } from 'jotai';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import { Footer } from '@/components/Footer';
import { TopNav } from '@/components/TopNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Slick Telemetry',
  description: 'Formula 1 Data Analysis',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='dark'>
      <body className={clsx('min-h-screen', inter.className)}>
        <Provider>
          <TopNav />
          {children}
        </Provider>
        <Footer />
      </body>
    </html>
  );
}
