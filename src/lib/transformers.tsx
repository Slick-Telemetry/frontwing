import { sessionUrlParams } from '@/lib/constants';

export const formatSessionUrl = (session: string) =>
  sessionUrlParams[session as keyof typeof sessionUrlParams];

const timeAjustment = (name: string) => (name === 'Race' ? 7200000 : 3600000);

export const formatNextEvent = (data: EventSchedule) => {
  const sessionTimes = Object.keys(data).filter((key) =>
    key.match(/Session[1-5]DateUtc/g),
  );

  // Find the Next Session Time
  const nextSessionTime = sessionTimes.find((session) => {
    const sessionName = data[
      session.slice(0, 8) as keyof EventSchedule
    ] as string;
    const timeWithAdjustment = Date.now() - timeAjustment(sessionName);
    return (
      timeWithAdjustment <
      new Date(data[session as keyof EventSchedule] as string).getTime()
    );
  });

  if (!nextSessionTime) return 'No session';

  const sessionStartTime = new Date(
    (data[nextSessionTime as keyof EventSchedule] as string) + ' UTC',
  ).getTime();
  const sessionName = data[
    nextSessionTime.slice(0, 8) as keyof EventSchedule
  ] as string;

  return {
    name: data.EventName,
    session: sessionName,
    time: sessionStartTime,
    endTime: sessionStartTime + timeAjustment(sessionName),
  };
};
