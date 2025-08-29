import { TopNav } from '@/components/TopNav';

import { Header } from '@/app/[year]/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNav />
      <Header />
      {/* Other Layout UI */}
      {children}
    </>
  );
}
