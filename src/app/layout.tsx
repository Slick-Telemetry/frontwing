import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Slick Telemetry',
  description: 'Formula 1 Data Analysis',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='navbar bg-base-100'>
          <div className='container mx-auto'>
            <a className='btn btn-ghost text-xl'>Slick Telemetry</a>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
