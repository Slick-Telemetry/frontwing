import clsx from 'clsx';
import { BsFillStarFill } from 'react-icons/bs';

import {
  fastestLap,
  formatDuration,
  positionEnding,
} from '../../utils/helpers';

export const DriverResultsInfo = ({
  driver,
  subEl = false,
}: {
  driver: DriverResult;
  subEl?: boolean;
}) => {
  const durationPlus = driver.Position !== 1 ? '+' : '';
  return (
    <>
      {/* Driver Standings */}
      <p className='font-mono text-2xl italic'>
        {positionEnding(driver.Position)} - {driver.Points} points
        {fastestLap(driver.Position, driver.Points) && <BsFillStarFill />}
      </p>
      <div>
        <div>
          <h3
            className={clsx('font-bold', {
              'text-2xl': subEl,
              'text-4xl': !subEl,
            })}
          >
            {driver.FullName}
          </h3>
          {!subEl && (
            <h4
              className={clsx({
                'text-1xl': subEl,
                'text-3xl': !subEl,
              })}
            >
              {driver.TeamName}
            </h4>
          )}
        </div>
      </div>
      {!subEl && (
        <h3 className='text-2xl font-bold'>
          {driver.Time
            ? durationPlus + formatDuration(driver.Time)
            : driver.Status}
        </h3>
      )}
    </>
  );
};

export const ConstructorResultsInfo = ({ con }: { con: ConstructorResult }) => {
  return (
    <>
      <p className='font-mono text-2xl italic'>
        {positionEnding(con.position)} - {con.points} points
      </p>
      <h3 className='text-4xl font-bold'>{con.name}</h3>
      <hr className='my-2' />
      <div className='flex flex-col gap-4 md:flex-row'>
        {con.drivers &&
          con.drivers.map((driver: DriverResult) => (
            <div key={driver.FullName}>
              <DriverResultsInfo driver={driver} subEl={true} />
            </div>
          ))}
      </div>
    </>
  );
};
