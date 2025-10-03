import React, { Fragment, useEffect, useRef, useState } from 'react';
import Map, { MapRef } from 'react-map-gl/mapbox';

import 'mapbox-gl/dist/mapbox-gl.css';

import { getColor } from '@/lib/utils';

import { ConnectionLine } from '@/app/[year]/map/_components/map/connection-line';
import { MapLoader } from '@/app/[year]/map/_components/map/loader';
import { MapMarker } from '@/app/[year]/map/_components/map/marker';
import MapNavigation from '@/app/[year]/map/_components/map/navigation';

import { FragmentType, graphql, useFragment } from '@/types';

const optimalZoom = 14; // optimal zoom for circuit visibility
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
export const MapEvent = graphql(`
  fragment MapEvent on events {
    round_number
    name
    date
    location
    sessions(limit: 1, where: { name: { _eq: Race } }) {
      circuit {
        latitude
        longitude
      }
    }
  }
`);

type MapProps = {
  events: FragmentType<typeof MapEvent>[];
};

export const MapContent = ({
  selectedEvent,
  onClickAction,
  ...props
}: MapProps & {
  selectedEvent: string | null;
  onClickAction: (event: string) => void;
}) => {
  const events = useFragment(MapEvent, props.events);
  const mapRef = useRef<MapRef>(null);

  const [mapLoading, setMapLoading] = useState<boolean>(true);

  let index = events.findIndex((e) => e.name === selectedEvent);
  if (index === -1) index = events.length - 1; // use last event as default if no match
  const { latitude, longitude } = events?.[index]?.sessions[0]?.circuit ?? {};

  const zoomOnMap = React.useCallback(
    (zoom?: number) => {
      if (!mapRef.current || longitude == null || latitude == null) return;

      const mapZoom = mapRef.current.getZoom();
      mapRef.current.flyTo({
        center: [longitude, latitude],
        zoom: zoom ?? mapZoom,
        speed: 2,
        curve: 1,
      });
    },
    [mapRef, latitude, longitude],
  );

  // Zoom to selected event
  useEffect(() => {
    zoomOnMap();
  }, [zoomOnMap]);

  const handleLoad = () => {
    setMapLoading(false);
    zoomOnMap();
  };

  const toggleZoom = () => {
    if (!mapRef.current) return;

    if (Math.ceil(mapRef.current.getZoom()) >= optimalZoom) {
      zoomOnMap(5);
    } else {
      zoomOnMap(14);
    }
  };

  return (
    <div className='relative h-[666px] w-full overflow-hidden rounded border-t'>
      <Map
        reuseMaps
        ref={mapRef}
        onLoad={handleLoad}
        initialViewState={{ zoom: 5 }}
        projection={{ name: 'globe' }}
        mapStyle='mapbox://styles/mapbox/standard-satellite' // Use any Mapbox style
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <MapNavigation
          prev={events[index - 1]}
          next={events[index + 1]}
          selectEvent={onClickAction}
          toggleZoom={toggleZoom}
        />
        {!mapLoading &&
          events.map((event, i) => {
            const color = getColor(event.date);
            return (
              <Fragment key={event.name}>
                <MapMarker
                  event={event}
                  color={color}
                  selectEvent={() => {
                    onClickAction(event.name as string);
                    zoomOnMap(optimalZoom);
                  }}
                />
                <ConnectionLine
                  event={event}
                  color={color}
                  adjacentEvent={events[i - 1]}
                />
              </Fragment>
            );
          })}
      </Map>
      <MapLoader loading={mapLoading} />
    </div>
  );
};
