import { greatCircle } from '@turf/great-circle';
import { Layer, Source } from 'react-map-gl/mapbox';

import { MapEventFragment } from '@/types/graphql';

export const ConnectionLine = ({
  event,
  adjacentEvent,
  color,
}: {
  event: MapEventFragment;
  color: string;
  adjacentEvent?: MapEventFragment;
}) => {
  const lineCoordinates = adjacentEvent
    ? greatCircle(
        [
          event.sessions[0].circuit?.longitude as number,
          event.sessions[0].circuit?.latitude as number,
        ],
        [
          adjacentEvent.sessions[0].circuit?.longitude as number,
          adjacentEvent.sessions[0].circuit?.latitude as number,
        ],
      ).geometry.coordinates
    : [];

  const coordinates =
    lineCoordinates.length === 2
      ? (lineCoordinates as GeoJSON.Position[][])
      : [lineCoordinates as GeoJSON.Position[]];

  return (
    <Source
      id={event.name || event.location || ''}
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
