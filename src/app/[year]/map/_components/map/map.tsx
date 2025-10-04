import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import Map, {
  FullscreenControl,
  MapRef,
  NavigationControl,
} from 'react-map-gl/mapbox';

import 'mapbox-gl/dist/mapbox-gl.css';

import { getColor } from '@/lib/utils';
import { useResizeObserver } from '@/hooks/use-resize-observer';

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
  const containerRef = useRef<HTMLDivElement>(null);

  // Use the reusable resize observer hook for smooth map resizing
  useResizeObserver(containerRef.current, () => {
    if (!mapLoading && mapRef.current) {
      mapRef.current?.resize();
    }
  });

  const [mapLoading, setMapLoading] = useState<boolean>(true);

  let index = events.findIndex((e) => e.name === selectedEvent);
  if (index === -1) index = events.length - 1; // use last event as default if no match
  const { latitude, longitude } = events?.[index]?.sessions[0]?.circuit ?? {};

  const zoomOnMap = useCallback(
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
    [longitude, latitude],
  );

  // Zoom to selected event when it changes
  useEffect(() => {
    if (!mapLoading) {
      zoomOnMap(optimalZoom);
    }
  }, [selectedEvent, mapLoading, zoomOnMap]);

  const handleLoad = () => {
    setMapLoading(false);
    zoomOnMap();
  };

  return (
    <div
      ref={containerRef}
      className='relative h-[666px] w-full overflow-hidden rounded border-t'
    >
      <Map
        id='mapbox-gl-test'
        reuseMaps
        ref={mapRef}
        onLoad={handleLoad}
        initialViewState={{ zoom: 5 }}
        projection={{ name: 'globe' }}
        mapStyle='mapbox://styles/mapbox/standard-satellite'
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <FullscreenControl position='top-left' />
        <NavigationControl position='top-left' />
        <MapNavigation
          prev={events[index - 1]}
          next={events[index + 1]}
          selectEvent={onClickAction}
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
