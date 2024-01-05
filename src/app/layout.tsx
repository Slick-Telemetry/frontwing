import clsx from 'clsx';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import { Nav } from './ui/Nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Slick Telemetry',
  description: 'Formula 1 Data Analysis',
};

const checkServer = async () => {
  // Check if server exists
  // Cannot use jotai on server component, aka RootLayout
  const data = fetch('http://0.0.0.0:80', { cache: 'no-store' }).then(
    (res) => {
      if (!res.ok) {
        return null;
      }
      return true;
    },
    () => {
      return null;
    },
  );

  return data;
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const server = await checkServer();

  return (
    <html lang='en'>
      <body className={clsx(inter.className, { server: server })}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
