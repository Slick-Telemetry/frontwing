'use client';

import { useQuery } from '@apollo/client';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import { GET_EVENT } from '@/lib/queries';
import { eventLocationDecode } from '@/lib/utils';

import { EventTypeBadge } from '@/components/EventTypeBadge';
import { ServerPageError } from '@/components/ServerError';

import { GetEventQuery, GetEventQueryVariables } from '@/generated/types';

import circuit from '../../../../public/Bahrain_carbon.png';

export const Header = () => {
  const {
    year,
    event: eventParam,
    session,
  } = useParams<{ year: string; event: string; session?: string }>();
  const { data, error } = useQuery<GetEventQuery, GetEventQueryVariables>(
    GET_EVENT,
    {
      variables: {
        year: parseInt(year),
        event: eventLocationDecode(eventParam),
      },
    },
  );

  if (!data || error) {
    return <ServerPageError msg='Event not found' />;
  }

  const event = data.schedule[0];
  return (
    <>
      <div className='flex justify-between p-4'>
        <div className='text-2xl'>
          <p>Round {event.round_number}</p>
          <p>
            {event.event_name} <EventTypeBadge format={event.event_format} />
          </p>
          <p>
            {event.location}, {event.country}
          </p>
          {session && <p className='capitalize'>{session}</p>}
        </div>

        <Image
          className='w-48'
          src={circuit}
          alt={event.official_event_name || ''}
        />
      </div>
    </>
  );
};
