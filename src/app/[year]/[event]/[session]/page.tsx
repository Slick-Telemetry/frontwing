import {
  ChartViewController,
  SessionHeader,
} from '@/app/[year]/[event]/[session]';

export default async function SessionPage() {
  return (
    <div className='container mx-auto py-2'>
      <SessionHeader />
      <ChartViewController />
    </div>
  );
}
