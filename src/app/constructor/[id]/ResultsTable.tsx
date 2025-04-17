import React, { memo, useMemo } from 'react';

import { GetConstructorQuery } from '@/generated/types';

type DriverSessionProps =
  GetConstructorQuery['constructors'][number]['driver_sessions'][number];

export const ResultsTable = ({
  drivers,
  driverSessions,
  children,
}: {
  drivers: (string | null | undefined)[];
  driverSessions: DriverSessionProps[];
  children: React.ReactNode;
}) => {
  const uniqueSessions = useMemo(() => {
    const sessionMap = new Map<string, DriverSessionProps>();

    driverSessions.forEach((ds) => {
      const sessionKey = `${ds.session?.event?.name}-${ds.session?.name}`;
      if (!sessionMap.has(sessionKey)) {
        sessionMap.set(sessionKey, ds);
      }
    });

    return Array.from(sessionMap.values());
  }, [driverSessions]);

  return (
    <main
      className='grid divide-x divide-y divide-dashed'
      style={{
        gridTemplateColumns: `repeat(${drivers.length + 1}, 1fr)`,
      }}
    >
      {children}

      {/* Driver Header */}
      {drivers.map((driver) => (
        <DriverHeader
          key={driver}
          driver={driver}
          driverSessions={driverSessions}
        />
      ))}

      {/* Rows - Event Description & Driver Results */}
      {uniqueSessions.map((session) => {
        // const relatedSessions = driverSessions.filter(
        //   (ds) => ds.session?.id === session?.session?.id,
        // );
        return (
          <SessionRow key={session.session?.name} session={session}>
            {drivers.map((d) => {
              const relatedDriverSession = uniqueSessions.find(
                (ds) => ds.driver?.full_name === d,
              );
              return (
                <DriverSessionStats
                  key={d}
                  driverSession={relatedDriverSession}
                />
              );
            })}
          </SessionRow>
        );
      })}
    </main>
  );
};

const DriverHeader = memo(
  ({
    driver,
    driverSessions,
  }: {
    driver: string | null | undefined;
    driverSessions: DriverSessionProps[];
  }) => {
    const points = driverSessions
      .filter((ds) => ds.driver?.full_name === driver)
      .reduce((acc, ds) => acc + Number(ds.results[0]?.points || 0), 0);

    return (
      <div className='flex items-center justify-between p-4 text-center'>
        <h3 className='text-2xl'>{driver}</h3>
        <div>
          <p className='text-xs'>Points:</p>
          <span className='text-2xl font-semibold'>{points}</span>
        </div>
      </div>
    );
  },
);

const SessionRow = memo(
  ({
    session,
    children,
  }: {
    session: DriverSessionProps;
    children: React.ReactNode;
  }) => {
    const eventName = session?.session?.event?.name || '';
    const sessionName = session?.session?.name || '';

    return (
      <React.Fragment key={eventName + sessionName}>
        {/* Session Lead Col */}
        <div className='p-4'>
          <p className='text-sm italic'>{sessionName}</p>
          <h3 className='text-xl'>{eventName}</h3>
        </div>

        {children}
      </React.Fragment>
    );
  },
);

const DriverSessionStats = memo(
  ({ driverSession }: { driverSession?: DriverSessionProps }) => {
    return (
      <div className='flex items-center justify-between p-4 text-center'>
        <div>
          <p className='text-xs'>Start:</p>
          <p className='text-2xl font-semibold'>
            {driverSession?.results[0]?.grid_position || '-'}
          </p>
        </div>
        <div>
          <p className='text-xs'>Finish:</p>
          <p className='text-2xl font-semibold'>
            {driverSession?.results[0]?.classified_position || '-'}
          </p>
        </div>
        <div>
          <p className='text-xs'>Points:</p>
          <span className='text-2xl font-semibold'>
            {driverSession?.results[0]?.points || 0}
          </span>
        </div>
      </div>
    );
  },
);
