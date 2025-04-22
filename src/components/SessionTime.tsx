import { CalendarPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { eventLocationEncode } from '@/lib/utils';

// const sessionTitles: Record<Session_Name_Choices_Enum, string> = {
//   [Session_Name_Choices_Enum.Practice_1]: 'FP1',
//   [Session_Name_Choices_Enum.Practice_2]: 'FP2',
//   [Session_Name_Choices_Enum.Practice_3]: 'FP3',
//   [Session_Name_Choices_Enum.Race]: 'GP',
//   [Session_Name_Choices_Enum.Qualifying]: 'Q',
//   [Session_Name_Choices_Enum.SprintQualifying]: 'SQ',
//   [Session_Name_Choices_Enum.Sprint]: 'S',
//   [Session_Name_Choices_Enum.SprintShootout]: 'SS',
//   [Session_Name_Choices_Enum.TestSession]: '',
// };

const sessionTitles: Record<string, string> = {
  'Practice 1': 'FP1',
  'Practice 2': 'FP2',
  'Practice 3': 'FP3',
  Race: 'GP',
  Qualifying: 'Q',
  'Sprint Qualifying': 'SQ',
  Sprint: 'S',
  'Sprint Shootout': 'SS',
  'Test Session': 'TEST',
};

export const SessionTime = ({
  event,
  time,
  name,
}: {
  time?: string | null;
  name?: string | null;
  event?: string | null;
  // name?: Session_Name_Choices_Enum | null;
}) => {
  const router = useRouter();
  const futureEvent = new Date(time || '').getTime() > Date.now();
  const year = new Date(time || '').getFullYear();
  return (
    <div
      className='flex cursor-pointer items-center gap-2 px-4 hover:underline'
      onClick={() =>
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
