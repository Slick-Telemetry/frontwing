import { Header } from '@/app/[year]/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {/* Other Layout UI */}
      {children}
    </>
  );
}
