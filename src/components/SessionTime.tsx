import moment from 'moment';
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
  return (
    <>
      {time && (
        <div className='flex min-w-16 flex-col items-center bg-gray-300 p-2 dark:bg-gray-600'>
          <p className='text-xs'>{moment(time).local().format('ddd')}</p>
          <p className='text-2xl leading-6 font-extrabold'>
            {moment(time).local().format('D')}
          </p>
          <p className='text-xs'>{moment(time).local().format('MMM')}</p>
        </div>
      )}
      <div>
        {time && (
          <p className='font-mono text-sm'>
            {moment(time).local().format('LT')}
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
