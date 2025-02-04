'use client';

import { useQuery } from '@apollo/client';
import clsx from 'clsx';
import { Earth } from 'lucide-react';
import React, { Fragment, useMemo, useState } from 'react';
import Map from 'react-map-gl/mapbox';

import 'mapbox-gl/dist/mapbox-gl.css';

import { GET_SEASON_EVENTS_SIMPLE } from '@/lib/queries';
import { getColor } from '@/lib/utils';

import { ServerPageError } from '@/components/ServerError';

import {
  GetSeasonEventsSimpleQuery,
  GetSeasonEventsSimpleQueryVariables,
} from '@/generated/types';

import { ConnectionLine } from './ConnectionLine';
import { Legend } from './Legend';
import { MapMarker } from './Marker';
import { MapPopup } from './Popup';
import { PrevNextButtons } from './PrevNextButtons';

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

  const { data, error } = useQuery<
    GetSeasonEventsSimpleQuery,
    GetSeasonEventsSimpleQueryVariables
  >(GET_SEASON_EVENTS_SIMPLE, {
    variables: { year: 2024 },
  });

  const [selectedEvent, setSelectedEvent] = useState<WeekendEvent | null>(null);

  const LegendMemo = useMemo(() => {
    if (!data) return null;
    return <Legend events={data.events} selectEvent={setSelectedEvent} />;
  }, [data]);

  const MarkersLinesMemo = useMemo(() => {
    if (!data) return null;

    return data.events.map((event, i) => {
      const color = getColor(event.date);
      const prevEvent = data.events[i - 1];
      return (
        <Fragment key={event.name}>
          <MapMarker
            event={event}
            color={color}
            selectEvent={setSelectedEvent}
          />

          {/* Map needs to load first */}
          {loading ? null : (
            <ConnectionLine event={event} color={color} prevEvent={prevEvent} />
          )}
        </Fragment>
      );
    });
  }, [data, loading]);

  if (error) return <ServerPageError />;

  // Navigate to previous or next Event
  // type
  /**
   * @description
   * @param {('prev' | 'next')} [type='next']
   */
  const handleAdjacent = (type: 'prev' | 'next' = 'next') => {
    if (!data || !selectedEvent) return;
    const dirVal = type === 'prev' ? -1 : 1;
    const event = data.events.find(
      (e) => e.round_number === (selectedEvent.round_number as number) + dirVal,
    );
    setSelectedEvent(event as WeekendEvent);
  };

  return (
    <div className='relative flex h-[700px] w-full items-center justify-center'>
      <Map
        initialViewState={initialView}
        mapStyle='mapbox://styles/mapbox/standard-satellite' // Use any Mapbox style
        mapboxAccessToken={MAPBOX_TOKEN}
        projection={{ name: 'globe' }}
        onLoad={() => setLoading(false)}
      >
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
            {/* Prev and Next Event Buttons */}
            <PrevNextButtons
              events={data?.events}
              selectedEvent={selectedEvent}
              handleAdjacent={handleAdjacent}
            />
          </MapPopup>
        )}
      </Map>
      <MapLoader loading={loading} />
    </div>
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
