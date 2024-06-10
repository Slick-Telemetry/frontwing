import clsx from 'clsx';

import { positionEnding } from '../lib/utils';

export const StandingsTimeline = ({
  data,
}: {
  data: DriverStandingSchema[] | ConstructorStandingSchema[];
}) => {
  return (
    <ul className='timeline timeline-vertical timeline-snap-icon max-md:timeline-compact'>
      {data.map((standing, i: number) => {
        const odd = i % 2 === 1;
        return (
          <li
            // className='item-start mb-10'
            key={
              (standing as DriverStandingSchema)?.Driver?.givenName ||
              (standing as ConstructorStandingSchema)?.Constructor?.name
            }
          >
            {/* ! Use Flex order ! Yay */}
            <PositionMarker pos={positionEnding(standing.position)} odd={odd} />
            <TimelineMarker />
            <div
              className={clsx('timeline-end timeline-box !mb-10', {
                'md:timeline-start md:text-end': !odd,
              })}
            >
              {Object.prototype.hasOwnProperty.call(standing, 'Driver') && (
                <DriverStandingInfo driver={standing as DriverStandingSchema} />
              )}
              {Object.prototype.hasOwnProperty.call(
                standing,
                'Constructor',
              ) && (
                <ConstructorStandingInfo
                  con={standing as ConstructorStandingSchema}
                />
              )}
            </div>
            <hr />
          </li>
        );
      })}
    </ul>
  );
};

const DriverStandingInfo = ({
  driver,
  subEl = false,
}: {
  driver: DriverStandingSchema;
  subEl?: boolean;
}) => {
  return (
    <>
      {/* Driver Standings */}
      {driver.Driver && (
        <h3
          className={clsx('font-bold', {
            'text-2xl': subEl,
            'text-4xl': !subEl,
          })}
        >
          {driver.Driver.givenName} {driver.Driver.familyName}
        </h3>
      )}
      {!subEl && (
        <h3 className='text-2xl font-bold'>
          {driver.Constructors.map(({ name }) => (
            <span key={name}>{name}</span>
          ))}
        </h3>
      )}
      <p>Points: {driver.points}</p>
      <p>Wins: {driver.wins}</p>
    </>
  );
};

const ConstructorStandingInfo = ({
  con,
}: {
  con: ConstructorStandingSchema;
}) => {
  return (
    <>
      <h3 className='text-4xl font-bold'>{con.Constructor.name}</h3>
      <p>Points: {con.points}</p>
      <p>Wins: {con.wins}</p>
      <hr className='my-2' />
      <div className='flex flex-col gap-4 md:flex-row'>
        {con.Drivers &&
          con.Drivers.map((driver) => (
            <div key={driver.Driver.dateOfBirth}>
              <DriverStandingInfo driver={driver} subEl={true} />
            </div>
          ))}
      </div>
    </>
  );
};

const PositionMarker = ({
  pos,
  odd = false,
}: {
  pos: string;
  odd?: boolean;
}) => (
  <div
    className={clsx('timeline-start timeline-box !mb-auto', {
      'md:timeline-end': !odd,
    })}
  >
    <p className='font-mono text-2xl italic'>{pos}</p>
  </div>
);

const TimelineMarker = () => (
  <div className='timeline-middle mx-2'>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      fill='currentColor'
      className='h-4 w-4'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75'
      />
    </svg>
  </div>
);
