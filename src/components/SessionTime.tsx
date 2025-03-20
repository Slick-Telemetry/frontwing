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
  id: string;
  time?: string | null;
  name?: Session_Name_Choices_Enum | null;
}) => {
  const router = useRouter();

  return (
    <div
      className='border-accent-foreground mt-2 flex cursor-pointer items-center overflow-hidden rounded border hover:border-current'
      onClick={() => router.push('/session/' + id)}
    >
      {name && (
        <div className='flex min-w-16 flex-col items-center bg-gray-300 p-2 dark:bg-gray-600'>
          <p className='font-black'>{sessionTitles[name]}</p>
        </div>
      )}
      <div className='flex w-full items-center justify-between gap-2 p-2'>
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
        {/* <CalendarPlus/> */}
      </div>
    </div>
  );
};
