'use client';
import { useQuery } from '@apollo/client/react';
import clsx from 'clsx';
import { Earth } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { Fragment, useMemo } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';

import { GET_MAP_EVENTS } from '@/lib/queries';
import { getColor } from '@/lib/utils';

import { ServerPageError } from '@/components/ServerError';

import { PrevNextButtons } from '@/app/[year]/map/PrevNextButtons';

import { ConnectionLine } from '../ConnectionLine';
import { MapMarker } from '../Marker';
import { MapPopup } from '../Popup';

import { GetMapEventsQuery, GetMapEventsQueryVariables } from '@/types/graphql';

export const MapContent = ({
  selectedEvent,
  onClickAction,
}: {
  selectedEvent: string | null;
  onClickAction: (event: string) => void;
}) => {
  const { year } = useParams<{ year: string }>();

  const { data, error } = useQuery<
    GetMapEventsQuery,
    GetMapEventsQueryVariables
  >(GET_MAP_EVENTS, {
    variables: { year: parseInt(year) },
  });

  // Map Marker and Line to previous location
  const MarkersLinesMemo = useMemo(() => {
    if (!data) return null;

    return data.events.map((event, i) => {
      const color = getColor(event.date);
      const nextEvent = data.events[i + 1];
      return (
        <Fragment key={event.name}>
          <MapMarker event={event} color={color} selectEvent={onClickAction} />

          {/* Map needs to load first */}
          <ConnectionLine event={event} color={color} prevEvent={nextEvent} />
        </Fragment>
      );
    });
  }, [data, onClickAction]);

  if (error) return <ServerPageError />;
  if (!data) return <MapLoader loading={true} />;

  /**
   * @description Navigate to previous or next Event
   * @param {('prev' | 'next')} [type='next']
   */
  const handleAdjacent = (type: 'prev' | 'next' = 'next') => {
    if (!data || !selectedEvent) return;
    const dirVal = type === 'prev' ? -1 : 1;
    const eventIndex =
      data.events.findIndex((e) => e.name === selectedEvent) || 0;
    onClickAction(data.events?.[eventIndex + dirVal]?.name ?? selectedEvent);
  };

  return (
    <>
      {/* Legend */}
      {/* {LegendMemo} */}

      {/* Markers & Connecting Lines */}
      {MarkersLinesMemo}

      {/* Popup */}
      {selectedEvent && (
        <MapPopup
          event={data?.events.find((e) => e.name === selectedEvent)}
          handleClose={() => onClickAction('')}
        />
      )}
      <PrevNextButtons
        events={data?.events}
        selectedEvent={data?.events.find((e) => e.name === selectedEvent)}
        handleAdjacent={handleAdjacent}
      />
    </>
  );
};

export const MapLoader = ({ loading }: { loading: boolean }) => {
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
