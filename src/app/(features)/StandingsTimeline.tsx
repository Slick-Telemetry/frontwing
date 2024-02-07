import clsx from 'clsx';

import { positionEnding } from '../../utils/helpers';

export const DriverStandingInfo = ({
  driver,
  subEl = false,
}: {
  driver: DriverStandingSchema;
  subEl?: boolean;
}) => {
  return (
    <>
      <p className='font-mono text-2xl italic'>
        {positionEnding(driver.position)}
      </p>

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

// constructor is a keyword cannot be used
export const ConstructorStandingInfo = ({
  con,
}: {
  con: ConstructorStandingSchema;
}) => {
  return (
    <>
      <p className='font-mono text-2xl italic'>
        {positionEnding(con.position)}
      </p>

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
