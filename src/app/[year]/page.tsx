import { SUPPORTED_SEASONS } from '@/lib/constants';

import NextEvent from '@/components/next-event';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';

import { QuickLinks } from '@/app/[year]/_components/quick-links';
import { Schedule } from '@/app/[year]/_components/schedule';
import TopThreeStandings from '@/app/[year]/_components/standings';

export default async function SeasonPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const latestYear = parseInt(year) === SUPPORTED_SEASONS[0];
  return (
    <div className='p-4 lg:p-6'>
      <div className='grid gap-4 md:grid-cols-3 2xl:grid-cols-4'>
        <div className='col-span-full'>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>{year}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className='flex flex-col gap-4 md:col-span-2'>
          <div className='flex h-full min-h-48 justify-center overflow-hidden rounded border'>
            {latestYear && <NextEvent />}
            {!latestYear && (
              <div
                className='flex flex-1 bg-cover bg-center bg-no-repeat'
                style={{ backgroundImage: `url(/mclaren-mp4.jpg)` }}
              ></div>
            )}
          </div>
          <QuickLinks year={year} />
        </div>
        <TopThreeStandings year={year} />
      </div>

      <div className='pt-6'>
        <Schedule year={year} />
      </div>
    </div>
  );
}
