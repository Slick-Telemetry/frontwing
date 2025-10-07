import { greatCircle } from '@turf/great-circle';
import { Layer, Source } from 'react-map-gl/mapbox';

import { MapScheduleLocationFragment } from '@/types/graphql';

export const ConnectionLine = ({
  event,
  adjacentEvent,
  color,
}: {
  event: MapScheduleLocationFragment;
  color: string;
  adjacentEvent?: MapScheduleLocationFragment;
}) => {
  const lineCoordinates = adjacentEvent
    ? greatCircle(
        [event?.longitude as number, event?.latitude as number],
        [adjacentEvent?.longitude as number, adjacentEvent?.latitude as number],
      ).geometry.coordinates
    : [];

  const coordinates =
    lineCoordinates.length === 2
      ? (lineCoordinates as GeoJSON.Position[][])
      : [lineCoordinates as GeoJSON.Position[]];

  return (
    <Source
      id={event.event_name || event.location || ''}
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
        id={event.event_name || 'line'}
        type='line'
        source={event.event_name || 'line-source'}
        paint={{
          'line-color': color,
          'line-width': 2, // Line width
        }}
      />
    </Source>
  );
};
