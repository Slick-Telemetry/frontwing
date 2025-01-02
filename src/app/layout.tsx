import clsx from 'clsx';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import { ErrorToast } from '@/components/ErrorToast';
import { Footer } from '@/components/Footer';
import { TopNav } from '@/components/TopNav';
import { Toaster } from '@/components/ui/toaster';

// import { Provider } from 'jotai';
import Providers from './providers';

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
        <Providers>
          <TopNav />
          {children}
        </Providers>
        <ErrorToast />
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
