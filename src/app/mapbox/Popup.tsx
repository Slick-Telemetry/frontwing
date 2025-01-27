import { distance, point } from '@turf/turf';
import { ChevronLeft, ChevronRight, CircleX } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { Popup, useMap } from 'react-map-gl';

import { Event } from './page';

export const MapPopup = ({
  event,
  prevEvent,
  nextEvent,
  handleClose,
  handlePrev,
  handleNext,
}: {
  event: Event;
  prevEvent?: Event;
  nextEvent?: Event;
  handleClose: () => void;
  handlePrev: () => void;
  handleNext: () => void;
}) => {
  const { current: map } = useMap();

  const longitude = event.sessions[0].circuit?.longitude as number;
  const latitude = event.sessions[0].circuit?.latitude as number;

  useEffect(() => {
    if (!map) return;
    map.flyTo({
      center: [longitude, latitude],
      duration: 1500,
    });
  }, [event, longitude, latitude, map]);

  const calcDistance = (loc1: number[], loc2: number[]) => {
    const from = point(loc1);
    const to = point(loc2);
    const totalDistance = distance(from, to);
    return Math.ceil(totalDistance);
  };

  return (
    <Popup
      longitude={longitude}
      latitude={latitude}
      onClose={handleClose}
      closeOnClick={false}
      closeButton={false}
      anchor='top'
      className='text-base text-black'
    >
      <div className='flex items-center justify-between'>
        <p>Round {event.round_number}</p>
        <CircleX size={16} className='cursor-pointer' onClick={handleClose} />
      </div>

      <Link href={'session/' + event.id} className='font-bold underline'>
        {event.name}
      </Link>

      <div className='mt-2 grid grid-cols-2 gap-6 leading-3'>
        {event.round_number && (
          <>
            {prevEvent && (
              <div
                className='flex cursor-pointer items-center'
                onClick={handlePrev}
              >
                <ChevronLeft />
                <div>
                  <p>
                    {prevEvent.location}
                    <br />
                    <span className='text-xs'>
                      {calcDistance(
                        [longitude, latitude],
                        [
                          prevEvent.sessions[0].circuit?.longitude as number,
                          prevEvent.sessions[0].circuit?.latitude as number,
                        ],
                      )}{' '}
                      KM
                    </span>
                  </p>
                </div>
              </div>
            )}
            {nextEvent && (
              <div
                className='col-start-2 flex cursor-pointer items-center'
                onClick={handleNext}
              >
                <div>
                  <p>
                    {nextEvent.location}
                    <br />
                    <span className='text-xs'>
                      {calcDistance(
                        [longitude, latitude],
                        [
                          nextEvent.sessions[0].circuit?.longitude as number,
                          nextEvent.sessions[0].circuit?.longitude as number,
                        ],
                      )}{' '}
                      KM
                    </span>
                  </p>
                </div>
                <ChevronRight />
              </div>
            )}
          </>
        )}
      </div>
    </Popup>
  );
};
