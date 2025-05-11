import clsx from 'clsx';
import { CalendarPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { eventLocationEncode } from '@/lib/utils';

import { Session_Name_Choices_Enum } from '@/generated/types';

const sessionTitles: Record<Session_Name_Choices_Enum, string> = {
  [Session_Name_Choices_Enum.Practice_1]: 'FP1',
  [Session_Name_Choices_Enum.Practice_2]: 'FP2',
  [Session_Name_Choices_Enum.Practice_3]: 'FP3',
  [Session_Name_Choices_Enum.Race]: 'GP',
  [Session_Name_Choices_Enum.Qualifying]: 'Q',
  [Session_Name_Choices_Enum.SprintQualifying]: 'SQ',
  [Session_Name_Choices_Enum.Sprint]: 'S',
  [Session_Name_Choices_Enum.SprintShootout]: 'SS',
  [Session_Name_Choices_Enum.TestSession]: '',
};

export const SessionTime = ({
  event,
  time,
  name,
}: {
  time?: string | null;
  name?: Session_Name_Choices_Enum | null;
  event?: string | null;
  // name?: Session_Name_Choices_Enum | null;
}) => {
  const router = useRouter();
  const futureEvent = new Date(time || '').getTime() > Date.now();
  const year = new Date(time || '').getFullYear();
  return (
    <div
      className={clsx(
        'flex items-center gap-2 px-4',
        !futureEvent && 'cursor-pointer hover:underline',
      )}
      onClick={() =>
        !futureEvent &&
        router.push(
          `${year}/${eventLocationEncode(event)}/${eventLocationEncode(name)}`,
        )
      }
    >
      {name && (
        <div className='flex h-full items-center justify-center py-2'>
          <p className='font-black'>{sessionTitles[name]}</p>
        </div>
      )}
      {time && (
        <p className='w-full text-right text-sm'>
          {new Date(time).toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })}
        </p>
      )}
      {futureEvent && <CalendarPlus />}
    </div>
  );
};
