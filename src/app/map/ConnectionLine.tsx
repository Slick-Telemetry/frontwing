import { greatCircle } from '@turf/turf';
import { Layer, Source } from 'react-map-gl/mapbox';

import { MapEvent } from '@/generated/customTypes';

export const ConnectionLine = ({
  event,
  prevEvent,
  color,
}: {
  event: MapEvent;
  color: string;
  prevEvent?: MapEvent;
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

  const coordinates =
    lineCoordinates.length === 2
      ? (lineCoordinates as GeoJSON.Position[][])
      : [lineCoordinates as GeoJSON.Position[]];

  return (
    <Source
      id={event.id}
      type='geojson'
      data={{
        type: 'Feature',
        geometry: {
          type: 'MultiLineString',
          coordinates: coordinates,
        },
        properties: {}, // Add an empty properties object
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
