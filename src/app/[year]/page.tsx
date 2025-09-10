import NextEvent from '@/components/next-event';

import { QuickLinks } from '@/app/[year]/_components/quick-links';
import { Schedule } from '@/app/[year]/_components/schedule';
import TopThreeStandings from '@/app/[year]/_components/standings';
export default async function SeasonPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;

  return (
    <main className='p-4 lg:p-6'>
      <div className='grid gap-4 md:grid-cols-3 2xl:grid-cols-4'>
        <div className='flex flex-col gap-4 md:col-span-2'>
          <div className='flex h-full justify-center rounded border px-4'>
            <NextEvent />
          </div>
          <QuickLinks year={year} />
        </div>
        <div className='flex h-full min-h-[296px] flex-col gap-2 rounded border p-4 2xl:col-span-2'>
          <TopThreeStandings year={year} />
        </div>
      </div>

      <div className='pt-6'>
        <Schedule year={year} />
      </div>
    </main>
  );
}
