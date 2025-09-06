import { Footer } from '@/components/Footer';
import { TopNav } from '@/components/TopNav';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { AppSidebar } from '@/app/[year]/_components/sidebar';

export default async function Layout({ children }: LayoutProps<'/[year]'>) {
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
          <TopNav />
          {children}
          <Footer />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
