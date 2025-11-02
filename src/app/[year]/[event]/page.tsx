'use client';
import { useQuery } from '@apollo/client/react';
import { use, useEffect } from 'react';

import { GET_EVENT_DETAILS } from '@/lib/queries';
import { eventLocationDecode } from '@/lib/utils';

import { CircuitMap } from '@/components/circuit-map';
import { EventDetails } from '@/components/event-details';
import { ServerPageError } from '@/components/ServerError';

import {
  EventResultsContainer,
  EventWinners,
  FIADocs,
  SessionCards,
  SessionCardSkeletons,
} from '@/app/[year]/[event]/_components';

const defaultData = {
  schedule: [],
  events: [
    {
      competition: [],
      qualifying: [],
      practice: [],
    },
  ],
  circuits: [],
  drivers: [],
  fia_documents: [],
};

const adjustRightColumnHeight = () => {
  const mainCol = document.getElementById('event-col-left');
  const rightCol = document.getElementById('event-col-right');
  if (mainCol && rightCol && mainCol.offsetHeight > window.innerHeight) {
    rightCol.style.maxHeight = `${mainCol.offsetHeight}px`;
  }
};

const EventPage = ({
  params,
}: {
  params: Promise<{ year: string; event: string }>;
}) => {
  const { year, event: eventLoc } = use(params);
  const {
    loading,
    data: dataSrc,
    error,
  } = useQuery(GET_EVENT_DETAILS, {
    variables: {
      year: parseInt(year),
      event: eventLocationDecode(eventLoc),
    },
  });

  useEffect(() => {
    adjustRightColumnHeight();
  }, [dataSrc]);

  const data = dataSrc ?? defaultData;

  if (error) return <ServerPageError msg='Failed to load event details.' />;

  return (
    <div className='flex grid-cols-3 flex-col gap-8 p-4 lg:grid lg:px-6'>
      <div id='event-col-left' className='col-span-2 h-fit'>
        <div className='flex justify-between gap-4'>
          <div className='grid gap-1'>
            {loading ? (
              <>
                <div className='bg-accent/50 h-9 w-72 animate-pulse rounded'></div>
                <div className='bg-accent/50 h-7 w-36 animate-pulse rounded'></div>
                <div className='bg-accent/50 h-7 w-56 animate-pulse rounded'></div>
              </>
            ) : (
              <EventDetails evt={data.schedule[0]} />
            )}
          </div>
          <div className='flex items-center justify-center px-8'>
            <CircuitMap
              circuitData={data.circuits[0]}
              className='max-h-[90px]'
            />
          </div>
        </div>

        <div className='relative grid gap-2 pt-4 pb-8 md:grid-cols-5'>
          {loading ? (
            <SessionCardSkeletons />
          ) : (
            <SessionCards schedule={data.schedule[0]} eventLoc={eventLoc} />
          )}
        </div>
        <EventResultsContainer
          loading={loading}
          sessions={dataSrc?.events ?? []}
        />
      </div>
      <div id='event-col-right' className='flex flex-1 flex-col'>
        <EventWinners
          drivers={data.drivers}
          loading={loading}
          name={eventLoc}
          location={data.schedule[0]?.location}
        />
        <div className='flex flex-1 flex-col overflow-hidden pt-8'>
          <FIADocs documents={data.fia_documents} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
