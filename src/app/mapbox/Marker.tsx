import { Marker } from 'react-map-gl';

import { Event } from './page';

export const MapMarker = ({
  event,
  color,
  selectEvent,
}: {
  event: Event;
  color: string;
  selectEvent: (event: Event) => void;
}) => {
  const { latitude, longitude } = event.sessions[0].circuit || {
    latitude: null,
    longitude: null,
  };

  return (
    <Marker
      longitude={longitude as number}
      latitude={latitude as number}
      onClick={() => selectEvent(event)}
      scale={2}
    >
      {/* Custom <MapPin /> */}
      <div className='relative flex cursor-pointer items-center justify-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill={color}
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='lucide lucide-map-pin'
        >
          <path d='M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0' />
        </svg>
        <p className='absolute pb-0.5'>{event.round_number}</p>
      </div>
    </Marker>
  );
};
