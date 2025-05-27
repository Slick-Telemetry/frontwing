import EventSelector from '@/components/eventSelector';
import SeasonSelector from '@/components/seasonSelector';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex-1'>
      <div className='flex items-center gap-4 p-4'>
        <SeasonSelector />
        <EventSelector />
        <SeasonSelector />
      </div>
      {/* Other Layout UI */}
      {children}
    </div>
  );
}
