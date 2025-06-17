import { LineChartSkeleton } from '@/app/[year]/[event]/[session]/LineChartSkeleton';

export const PageSkeleton = ({ chartType }: { chartType: string }) => {
  return (
    <div className='my-4 grid grid-cols-3 gap-4'>
      <div>
        {/* Table */}
        {chartType === 'drivers'
          ? Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className='border-muted flex h-[30px] items-center gap-2 border px-1'
              >
                <p className='w-8 text-center'>{i + 1}</p>
                <div className='bg-accent h-[30px] flex-1 animate-pulse'></div>
                <div className='bg-accent h-6 w-8 animate-pulse rounded'></div>
                <div className='bg-accent h-6 w-8 animate-pulse rounded'></div>
              </div>
            ))
          : Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className='border-muted flex h-[30px] items-center gap-1 border px-1 py-1'
              >
                <p className='h-6 w-8 text-center'>{i + 1}</p>
                <div className='bg-accent h-[30px] flex-1 animate-pulse'></div>
                <div className='bg-accent h-6 w-8 animate-pulse rounded'></div>
                <div className='bg-accent h-6 w-8 animate-pulse rounded'></div>
              </div>
            ))}
      </div>

      <div className='col-span-2'>
        {/* Charts */}
        <LineChartSkeleton />
        {/* Legend */}
        <div className='my-2 grid grid-cols-2 gap-2 sm:grid-cols-5'>
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className='flex flex-col justify-between rounded border p-1'
            >
              <span className='bg-accent h-4 w-24 animate-pulse rounded'></span>
              {chartType === 'drivers' && (
                <div className='mt-1 flex gap-x-2'>
                  <span className='bg-accent h-4 w-full animate-pulse rounded'></span>
                  <span className='bg-accent h-4 w-full animate-pulse rounded'></span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
