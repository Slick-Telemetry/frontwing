import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import clsx from 'clsx';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import { Footer } from '@/components/Footer';
import { TopNav } from '@/components/TopNav';

import { ApolloWrapper } from './apollo-provider';

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
      <body className={clsx('flex min-h-screen flex-col', inter.className)}>
        <ApolloWrapper>
          <TopNav />
          {children}
        </ApolloWrapper>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
