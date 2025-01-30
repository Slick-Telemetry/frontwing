import { greatCircle } from '@turf/turf';
import { Layer, Source } from 'react-map-gl';

import { Event } from './page';

export const ConnectionLine = ({
  event,
  prevEvent,
  color,
}: {
  event: Event;
  color: string;
  prevEvent?: Event;
}) => {
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
    <Source
      id={event.name}
      type='geojson'
      data={{
        type: 'Feature',
        geometry: {
          type: 'MultiLineString',
          coordinates:
            lineCoordinates.length === 2 ? lineCoordinates : [lineCoordinates],
        },
      }}
    >
      <Layer
        id={event.name || 'line'}
        type='line'
        source={event.name || 'line-source'}
        paint={{
          'line-color': color,
          'line-width': 2, // Line width
        }}
      />
    </Source>
  );
};
