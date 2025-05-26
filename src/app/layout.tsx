import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import clsx from 'clsx';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import './globals.css';

import { Footer } from '@/components/Footer';

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
          <div className='flex flex-1'>
            <div className='bg-muted w-fit min-w-52 p-4'>
              <Link
                href='/'
                className='btn btn-ghost flex items-center gap-x-2 text-xl font-extrabold tracking-tight'
              >
                <Image
                  src='/slick-telemetry-logo.png'
                  width={24}
                  height={24}
                  alt='Slick Telemetry Logo'
                />
                Slick Telemetry
              </Link>
            </div>
            <div className='flex-1 p-4'>
              {/* <TopNav /> */}
              {children}
            </div>
          </div>
        </ApolloWrapper>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
