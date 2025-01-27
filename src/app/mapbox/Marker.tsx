import { greatCircle } from '@turf/turf';
import moment from 'moment';
import { Layer, Marker, Source } from 'react-map-gl';

import { Event } from './page';

export const MapMarker = ({
  event,
  selectEvent,
  prevEvent,
}: {
  event: Event;
  selectEvent: (event: Event) => void;
  prevEvent?: Event;
}) => {
  const isToday = moment(event.date).isSame(moment(), 'day');
  const isPast = moment(event.date).isBefore(moment(), 'day');
  const fillColor = isToday ? '#4264FB' : isPast ? '#28a745' : '#FF0000';

  const lineCoordinates = prevEvent
    ? greatCircle(
        [
          event.sessions[0].circuit?.longitude as number,
          event.sessions[0].circuit?.latitude as number,
        ],
        [
          prevEvent.sessions[0].circuit?.longitude as number,
          prevEvent.sessions[0].circuit?.latitude as number,
        ],
      ).geometry.coordinates
    : [];

  return (
    <>
      <Marker
        key={event.name}
        longitude={event.sessions[0].circuit?.longitude as number}
        latitude={event.sessions[0].circuit?.latitude as number}
        onClick={() => selectEvent(event)}
        scale={2}
      >
        {/* Custom marker */}
        <div className='relative flex cursor-pointer items-center justify-center'>
          {/* <MapPin /> */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill={fillColor}
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
      {prevEvent && (
        <Source
          id={event.name}
          type='geojson'
          data={{
            type: 'Feature',
            geometry: {
              type: 'MultiLineString',
              coordinates:
                lineCoordinates.length === 2
                  ? lineCoordinates
                  : [lineCoordinates],
            },
          }}
        >
          <Layer
            id={event.name || 'line'}
            type='line'
            source={event.name || 'line-source'}
            paint={{
              'line-color': fillColor,
              'line-width': 2, // Line width
            }}
          />
        </Source>
      )}
    </>
  );
};
