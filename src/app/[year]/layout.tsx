import { cookies } from 'next/headers';

import { Footer } from '@/components/Footer';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { Nav } from '@/app/[year]/_components/nav';
import { AppSidebar } from '@/app/[year]/_components/sidebar';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <>
      <SidebarProvider
        defaultOpen={defaultOpen}
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 52)',
            '--header-height': 'calc(var(--spacing) * 16)',
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset className='@container/sidebar'>
          <Nav />
          {children}
          <Footer />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
