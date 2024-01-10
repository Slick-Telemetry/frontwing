import clsx from 'clsx';
import { Provider } from 'jotai';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import { fetchAPI } from './lib/utils';
import { Nav } from './ui/Nav';

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
  const server = await fetchAPI('', true);

  return (
    <html lang='en'>
      <body
        className={clsx('min-h-screen px-4', inter.className, {
          server: server,
          // noServer: !server,
        })}
      >
        <Provider>
          <Nav />
          {children}
        </Provider>
      </body>
    </html>
  );
}
