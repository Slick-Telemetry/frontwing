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
export const MapScheduleLocation = graphql(`
  fragment MapScheduleLocation on schedule {
    round_number
    event_name
    event_date
    location
    longitude
    latitude
  }
`);

type MapProps = {
  events: FragmentType<typeof MapScheduleLocation>[];
};

export const MapContent = ({
  selectedEvent,
  onClickAction,
  ...props
}: MapProps & {
  selectedEvent: string | null;
  onClickAction: (event: string) => void;
}) => {
  const events = useFragment(MapScheduleLocation, props.events);
  const mapRef = useRef<MapRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use the reusable resize observer hook for smooth map resizing
  useResizeObserver(containerRef, () => {
    if (!mapLoading && mapRef.current) {
      mapRef.current?.resize();
    }
  });

  const [mapLoading, setMapLoading] = useState<boolean>(true);

  let index = events.findIndex((e) => e.event_name === selectedEvent);
  if (index === -1) index = events.length - 1; // use last event as default if no match
  const { latitude, longitude } = events?.[index] ?? {};

  const zoomOnMap = useCallback(
    (zoom?: number) => {
      if (!mapRef.current || longitude == null || latitude == null) return;
      const mapZoom = mapRef.current.getZoom();
      mapRef.current.flyTo({
        center: [longitude, latitude],
        zoom: zoom ?? mapZoom,
        speed: 2.2,
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
            const color = getColor(event.event_date);
            return (
              <Fragment key={event.event_name}>
                <MapMarker
                  event={event}
                  color={color}
                  selectEvent={() => {
                    onClickAction(event.event_name as string);
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
