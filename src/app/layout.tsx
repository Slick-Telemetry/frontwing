import clsx from 'clsx';
import type { Metadata } from 'next';
import { Rubik, Space_Grotesk } from 'next/font/google';

import './globals.css';

import { ApolloProvider } from '@/app/apollo-provider';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});
const rubik = Rubik({ subsets: ['latin'], display: 'swap' });

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
      <body
        className={clsx(
          'flex min-h-screen flex-col antialiased',
          spaceGrotesk.variable,
          rubik.className,
        )}
      >
        <ApolloProvider>{children}</ApolloProvider>
      </body>
    </html>
  );
}
