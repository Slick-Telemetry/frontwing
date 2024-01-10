import { useAtom } from 'jotai';
import Image from 'next/image';
import { useMemo } from 'react';

import { seasonRacesAtom } from '@/atoms/results';

import { ISchedule } from '../lib/utils';

const ResultCard = ({ data }: { data: ISchedule }) => {
  const eventDate = new Date(data.EventDate);
  const eventPassed = new Date() > eventDate;

  return (
    <div className='card overflow-hidden bg-base-100 shadow-xl'>
      <div className='relative flex min-h-32 items-end p-4 '>
        <figure className='absolute inset-0 z-0 bg-gradient-to-tr from-base-100'>
          <Image
            width={928}
            height={548}
            className='w-full mix-blend-overlay'
            loader={() =>
              'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'
            }
            src='/shoe.jpg'
            alt='Shoes'
          />
        </figure>
        <div className='relative z-0'>
          <h3 className='card-title max-w-64'>
            {data.OfficialEventName.slice(0, -5)}
          </h3>
        </div>
      </div>

      <div className='card-body px-0 pb-4 pt-2'>
        <p className='px-4'>
          {data.Location}, {data.Country}
          <br />
          {eventDate.toDateString()}
        </p>

        {eventPassed && (
          <div className='card-actions justify-center'>
            <button className='btn btn-primary btn-sm btn-wide'>Results</button>
          </div>
        )}
      </div>
    </div>
  );
};

const WinterTesting = ({ data }: { data: ISchedule }) => {
  const eventDate = new Date(data.EventDate);
  const eventPassed = new Date() > eventDate;

  return (
    <div className='card relative min-h-48 justify-center overflow-hidden rounded-2xl p-4'>
      <figure className='absolute inset-0 z-0 flex items-center justify-end bg-gradient-to-r from-base-100'>
        <Image
          width={928}
          height={548}
          className='w-full mix-blend-overlay'
          loader={() =>
            'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'
          }
          src='/shoe.jpg'
          alt='Shoes'
        />
      </figure>
      <div className='relative z-0 flex flex-col gap-4 lg:items-start'>
        <div>
          <h3>{data.OfficialEventName}</h3>
          <p>
            {data.Location}, {data.Country}
          </p>
          <p>{eventDate.toDateString()}</p>
        </div>
        {eventPassed && (
          <a role='button' className='btn btn-sm'>
            Testing Results
          </a>
        )}
      </div>
    </div>
  );
};

export const RaceSchedule = () => {
  const [races] = useAtom(seasonRacesAtom);

  const winterTesting = useMemo(
    () => races.find((race) => race.EventFormat === 'testing'),
    [races],
  );
  const mainEvents = useMemo(
    () => races.filter((race) => race.EventFormat !== 'testing'),
    [races],
  );

  return (
    <div className='px-4 lg:px-0'>
      {/* If seasonAom === current/upcomming season, then add button to bring user to next event */}
      {winterTesting && <WinterTesting data={winterTesting} />}
      <div className='mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-4'>
        {/* 10 Placeholder Cards */}
        {mainEvents.map((race) => (
          <ResultCard key={race.EventName} data={race} />
        ))}
      </div>
    </div>
  );
};
