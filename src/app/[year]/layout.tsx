import { Footer } from '@/components/Footer';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { Nav } from '@/app/[year]/_components/nav';
import { AppSidebar } from '@/app/[year]/_components/sidebar';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 52)',
            '--header-height': 'calc(var(--spacing) * 12)',
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset>
          <Nav />
          {children}
          <Footer />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
