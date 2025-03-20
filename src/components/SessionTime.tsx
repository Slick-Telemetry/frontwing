import Link from 'next/link';

import { Session_Name_Choices_Enum } from '@/generated/types';
export const SessionTime = ({
  id,
  time,
  name,
}: {
  id: string;
  time?: string | null;
  name?: Session_Name_Choices_Enum | null;
}) => {
  const date = time && new Date(time);
  return (
    <>
      {date && (
        <div className='flex min-w-16 flex-col items-center bg-gray-300 p-2 dark:bg-gray-600'>
          <p className='text-xs'>
            {date.toLocaleString(undefined, { weekday: 'short' })}
          </p>
          <p className='text-2xl leading-6 font-extrabold'>
            {date.toLocaleString(undefined, { day: 'numeric' })}
          </p>
          <p className='text-xs'>
            {date.toLocaleString(undefined, { month: 'short' })}
          </p>
        </div>
      )}
      <div>
        {date && (
          <p className='font-mono text-sm'>
            {date.toLocaleString(undefined, {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}
          </p>
        )}
        <Link
          href={`/session/${id}`}
          className='text-2xl font-semibold hover:underline'
        >
          {name?.replace(/_/g, ' ')}
        </Link>
      </div>
    </>
  );
};
