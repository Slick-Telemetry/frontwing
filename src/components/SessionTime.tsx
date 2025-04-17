import { CalendarPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';

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
  id,
  time,
  name,
}: {
  id?: string | null;
  time?: string | null;
  name?: Session_Name_Choices_Enum | null;
}) => {
  const router = useRouter();
  const futureEvent = new Date(time || '').getTime() > Date.now();
  return (
    <div
      className='flex cursor-pointer items-center gap-2 divide-x hover:underline'
      onClick={() => router.push('/session/' + id)}
    >
      {name && (
        <div className='flex h-full min-w-16 items-center justify-center py-2'>
          <p className='font-black'>{sessionTitles[name]}</p>
        </div>
      )}
      <div className='flex w-full items-center justify-between gap-2'>
        {time && (
          <p className='text-sm'>
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
    </div>
  );
};
