'use client';

import { useQuery } from '@apollo/client';
import { use } from 'react';
import React from 'react';

import { GET_CONSTRUCTOR } from '@/lib/queries';
import { bgGradient } from '@/lib/utils';

import { ServerPageError } from '@/components/ServerError';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  GetConstructorQuery,
  GetConstructorQueryVariables,
} from '@/generated/types';

const EventPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const { loading, data, error } = useQuery<
    GetConstructorQuery,
    GetConstructorQueryVariables
  >(GET_CONSTRUCTOR, {
    variables: { _id: id },
  });

  const constructor = loading ? null : data?.constructors[0];

  const drivers = Array.from(
    new Set(constructor?.driver_sessions.map((ds) => ds.driver?.full_name)),
  );
  const sessions = (
    Array.from(
      new Set(
        constructor?.driver_sessions.map(
          (ds) => `${ds.session?.event?.name}-${ds.session?.name}`,
        ),
      ),
    ) as string[]
  ).map((session: string) => session.split('-'));

  const years = Array.from(
    new Set(constructor?.driver_sessions.map((ds) => ds.session?.event?.year)),
  );
  const driverSessionsByDriver = drivers.map((driver) => {
    return {
      driver,
      sessions: constructor?.driver_sessions.filter(
        (ds) => ds.driver?.full_name === driver,
      ),
    };
  });

  if (error) return <ServerPageError />;

  return (
    <div className='container'>
      {constructor && (
        <>
          <div
            className='mb-4 rounded py-4'
            style={{
              background: constructor.color
                ? bgGradient(constructor.color)
                : 'initial',
            }}
          >
            <h1 className='text-6xl font-semibold'>{constructor.name}</h1>
          </div>

          {sessions && drivers && (
            <div
              className='grid grid-flow-col divide-x divide-y divide-dashed'
              style={{
                gridTemplateColumns: `repeat(${drivers.length + 1}, 1fr)`,
                gridTemplateRows: `repeat(${sessions.length + 1}, 1fr)`,
              }}
            >
              {/* Spacer div */}
              <div className='flex items-center justify-center p-4'>
                <Select defaultValue='2024'>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Year' />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year + ''}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {sessions &&
                sessions.map((session) => (
                  <div key={session[0] + session[1]} className='p-4'>
                    <p className='text-sm italic'>{session[1]}</p>
                    <h3 className='text-xl'>{session[0]}</h3>
                  </div>
                ))}
              {drivers.map((driver) => (
                <React.Fragment key={driver}>
                  <div className='flex items-center justify-between p-4 text-center'>
                    <h3 className='text-3xl'>{driver}</h3>
                    <div>
                      <p className='text-xs'>Points:</p>
                      <span className='text-2xl font-semibold'>
                        {driverSessionsByDriver
                          .find((ds) => ds.driver === driver)
                          ?.sessions?.reduce(
                            (acc, session) =>
                              acc + Number(session?.results[0]?.points || 0),
                            0,
                          )}
                      </span>
                    </div>
                  </div>

                  {driverSessionsByDriver
                    .find((ds) => ds.driver === driver)
                    ?.sessions?.map((session) => (
                      <div
                        key={session.session?.id}
                        className='flex items-center justify-between p-4 text-center'
                      >
                        <div>
                          <p className='text-xs'>Start:</p>
                          <p className='text-2xl font-semibold'>
                            {session?.results[0]?.grid_position}
                          </p>
                        </div>
                        <div>
                          <p className='text-xs'>Finish:</p>
                          <p className='text-2xl font-semibold'>
                            {session?.results[0]?.classified_position}
                          </p>
                        </div>
                        <div>
                          <p className='text-xs'>Points:</p>
                          <span className='text-2xl font-semibold'>
                            {session?.results[0]?.points}
                          </span>
                        </div>
                      </div>
                    ))}
                </React.Fragment>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EventPage;
