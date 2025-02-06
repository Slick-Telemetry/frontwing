import clsx from 'clsx';
import { Marker } from 'react-map-gl/mapbox';

import { eventTiming } from '@/lib/utils';

export const MapMarker = ({
  event,
  color,
  selectEvent,
}: {
  event: WeekendEvent;
  color: string;
  selectEvent: (event: WeekendEvent) => void;
}) => {
  const { latitude, longitude } = event.sessions[0].circuit || {
    latitude: null,
    longitude: null,
  };

  const timing = eventTiming(event.date);

  return (
    <Marker
      longitude={longitude as number}
      latitude={latitude as number}
      onClick={() => selectEvent(event)}
    >
      {/* Custom <MapPin /> */}
      <div className='relative flex cursor-pointer items-center justify-center'>
        {/* SVG for ping animation */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='32'
          height='32'
          viewBox='0 0 24 24'
          fill={color}
          className={clsx(
            timing === 'present' &&
              'animate-[ping_1500ms_ease-in-out_infinite]',
            'lucide-map-pin absolute',
          )}
        >
          <path d='M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0' />
        </svg>

        {/* Consisten svg,  */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='32'
          height='32'
          viewBox='0 0 24 24'
          fill={color}
          stroke='currentColor'
          strokeWidth='1'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='lucide-map-pin'
        >
          <path d='M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0' />
        </svg>

        {/* Round number */}
        <p className='absolute pb-0.5'>{event.round_number}</p>
      </div>
    </Marker>
  );
};
