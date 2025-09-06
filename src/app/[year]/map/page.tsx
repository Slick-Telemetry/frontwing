'use client';
import { useQuery } from '@apollo/client/react';
import clsx from 'clsx';
import { Earth } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { Fragment, useMemo, useState } from 'react';
import Map from 'react-map-gl/mapbox';

import 'mapbox-gl/dist/mapbox-gl.css';

import { GET_MAP_EVENTS } from '@/lib/queries';
import { getColor } from '@/lib/utils';

import { ServerPageError } from '@/components/ServerError';

import { ConnectionLine } from './ConnectionLine';
import { Legend } from './Legend';
import { MapMarker } from './Marker';
import { MapPopup } from './Popup';
import { PrevNextButtons } from './PrevNextButtons';

import { MapEvent } from '@/types/global';
import { GetMapEventsQuery, GetMapEventsQueryVariables } from '@/types/graphql';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const initialView = {
  longitude: 0,
  latitude: 20,
  zoom: 2,
};

const WorldMap = () => {
  // We custom load state for map to load
  // This prevents issues rending the custom line layers
  const [loading, setLoading] = useState(true);

  return (
    <div className='relative flex h-[700px] w-full items-center justify-center'>
      <Map
        reuseMaps
        initialViewState={initialView}
        mapStyle='mapbox://styles/mapbox/standard-satellite' // Use any Mapbox style
        mapboxAccessToken={MAPBOX_TOKEN}
        projection={{ name: 'globe' }}
        onLoad={() => setLoading(false)}
      >
        {!loading && <MapContent />}
      </Map>
      <MapLoader loading={loading} />
    </div>
  );
};

const MapContent = () => {
  const { year } = useParams<{ year: string }>();

  const { data, error } = useQuery<
    GetMapEventsQuery,
    GetMapEventsQueryVariables
  >(GET_MAP_EVENTS, {
    variables: { year: parseInt(year) },
  });

  const [selectedEvent, setSelectedEvent] = useState<MapEvent | null>(null);

  // Set focus on first locatoin
  // useEffect(() => {
  //   if (data?.events) setSelectedEvent(data.events[0]);
  // }, [data]);

  // Legend Element
  const LegendMemo = useMemo(() => {
    if (!data) return null;
    return <Legend events={data.events} selectEvent={setSelectedEvent} />;
  }, [data]);

  // Map Marker and Line to previous location
  const MarkersLinesMemo = useMemo(() => {
    if (!data) return null;

    return data.events.map((event, i) => {
      const color = getColor(event.date);
      const nextEvent = data.events[i + 1];
      return (
        <Fragment key={event.name}>
          <MapMarker
            event={event}
            color={color}
            selectEvent={setSelectedEvent}
          />

          {/* Map needs to load first */}
          <ConnectionLine event={event} color={color} prevEvent={nextEvent} />
        </Fragment>
      );
    });
  }, [data]);

  if (error) return <ServerPageError />;

  /**
   * @description Navigate to previous or next Event
   * @param {('prev' | 'next')} [type='next']
   */
  const handleAdjacent = (type: 'prev' | 'next' = 'next') => {
    if (!data || !selectedEvent) return;
    const dirVal = type === 'prev' ? -1 : 1;
    const event = data.events.find(
      (e) => e.round_number === (selectedEvent.round_number as number) + dirVal,
    );
    setSelectedEvent(event as MapEvent);
  };

  return (
    <>
      {/* Legend */}
      {LegendMemo}

      {/* Markers & Connecting Lines */}
      {MarkersLinesMemo}

      {/* Popup */}
      {selectedEvent && (
        <MapPopup
          event={selectedEvent}
          handleClose={() => setSelectedEvent(null)}
        >
          <PrevNextButtons
            events={data?.events}
            selectedEvent={selectedEvent}
            handleAdjacent={handleAdjacent}
          />
        </MapPopup>
      )}
    </>
  );
};

const MapLoader = ({ loading }: { loading: boolean }) => {
  return (
    <div
      className={clsx(
        'pointer-events-none absolute inset-0 flex items-center justify-center bg-black transition-opacity duration-400',
        loading ? 'opacity-100' : 'opacity-0',
      )}
    >
      <Earth
        size={48}
        className={
          loading ? 'animate-[ping_1.5s_ease-out_infinite]' : 'animate-none'
        }
      />
    </div>
  );
};

export default WorldMap;
