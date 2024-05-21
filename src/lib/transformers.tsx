import { sessionUrlParams } from '@/lib/constants';

export const formatRaceUrl = (raceName: string) =>
  raceName.replace(' Grand Prix', '').replace(/ /g, '_').toLowerCase();

export const formatRaceEventName = (val: string) =>
  val
    .split('_')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ') + ' Grand Prix';

export const formatSessionUrl = (session: string) =>
  sessionUrlParams[session as keyof typeof sessionUrlParams];

// export const formatSessionName = (val: string) =>
//   Object.keys(sessionUrlParams).find(
//     (key) => sessionUrlParams[key as keyof typeof sessionUrlParams] === val,
//   );

export const formatConstructorResults = (drivers: DriverResult[]) =>
  drivers
    .reduce((cons, driver) => {
      // *** Find existint team from accumulator
      const existingTeamIndex = cons.findIndex(
        (team) => team.name === driver.TeamName,
      );

      // If:
      // 1. Team exists in accumulator
      // *** Update constructor values
      if (existingTeamIndex >= 0) {
        const update = { ...cons[existingTeamIndex] };
        const points = update.points + driver.Points;
        const conDrivers = [...update.drivers, driver];

        // *** Add Updated Constructor
        cons.push({
          ...update,
          points,
          drivers: conDrivers,
        });

        // *** Remove Old Constructor
        cons.splice(existingTeamIndex, 1);
      } else {
        // *** Add new Constructor
        cons.push({
          name: driver.TeamName,
          points: driver.Points,
          position: driver.Position, // Placeholder
          drivers: [driver],
        });
      }

      return cons;
    }, [] as ConstructorResult[])
    // Sort by points
    .sort((a, b) => (a.points > b.points ? -1 : 1))
    // Set proper position
    .map((con, i) => {
      con.position = i + 1;
      return con;
    });

const timeAjustment = (name: string) => (name === 'Race' ? 7200000 : 3600000);

export const formatNextEvent = (data: ScheduleSchema) => {
  const sessionTimes = Object.keys(data).filter((key) =>
    key.match(/Session[1-5]DateUtc/g),
  );

  // Find the Next Session Time
  const nextSessionTime = sessionTimes.find((session) => {
    const sessionName = data[
      session.slice(0, 8) as keyof ScheduleSchema
    ] as string;
    const timeWithAdjustment = Date.now() - timeAjustment(sessionName);
    return (
      timeWithAdjustment <
      new Date(data[session as keyof ScheduleSchema] as string).getTime()
    );
  });

  if (!nextSessionTime) return 'No session';

  const sessionStartTime = new Date(
    (data[nextSessionTime as keyof ScheduleSchema] as string) + ' UTC',
  ).getTime();
  const sessionName = data[
    nextSessionTime.slice(0, 8) as keyof ScheduleSchema
  ] as string;

  return {
    name: data.EventName,
    session: sessionName,
    time: sessionStartTime,
    endTime: sessionStartTime + timeAjustment(sessionName),
  };
};
