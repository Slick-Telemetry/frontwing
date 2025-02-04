import { CircleX, ZoomIn, ZoomOut } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Popup, useMap } from 'react-map-gl';

import { Badge } from '@/components/ui/badge';

import { Event_Format_Choices_Enum } from '@/generated/types';

import { Event } from './page';

const optimalZoom = 15; // optimal zoom for circuit visibility

export const MapPopup = ({
  event,
  handleClose,
  children,
}: {
  event: Event;
  handleClose: () => void;
  children: React.ReactNode;
}) => {
  const { current: map } = useMap();
  const [prevZoom, setPrevZoom] = useState(2);

  const longitude = event.sessions[0].circuit?.longitude as number;
  const latitude = event.sessions[0].circuit?.latitude as number;

  /**
   * @description focus to event location
   * @param {number} [zoom]
   */
  const focusLocation = useCallback(
    (zoom?: number) => {
      if (!map) return;
      const mapZoom = map.getZoom();

      map.flyTo({
        center: [longitude, latitude],
        zoom: zoom || mapZoom,
        speed: 2,
        curve: 3,
      });
    },
    [map, latitude, longitude],
  );

  useEffect(() => {
    focusLocation();
  }, [focusLocation]);

  // Used to autozoom in and out of circuit
  const toggleZoom = () => {
    if (!map) return;

    const mapZoom = Math.floor(map.getZoom());
    // If zoom is greater than equal to optimal zoom
    // then zoom back to users previous zoom setting
    if (mapZoom >= optimalZoom) {
      focusLocation(prevZoom);
      return;
    }

    focusLocation(optimalZoom);

    // Recall previous zoom level to return to it
    setPrevZoom(mapZoom);
  };

  return (
    <Popup
      longitude={longitude}
      latitude={latitude}
      onClose={handleClose}
      closeOnClick={false}
      closeButton={false}
      anchor='bottom'
      maxWidth='unset'
      className='overflow-hidden text-sm text-black'
    >
      <div className='relative grid min-w-xs'>
        {/* Floating Round Number */}
        <div className='absolute -top-8 right-5 text-8xl font-bold italic opacity-25'>
          {event.round_number}
        </div>

        {/* Top Row */}
        <div className='flex items-center justify-between'>
          <div className='flex gap-2'>
            {/* ZoomIn and ZoomOut as one */}
            <div
              onClick={toggleZoom}
              className='flex cursor-pointer items-center'
            >
              <ZoomIn size={16} /> / <ZoomOut size={16} />
            </div>
            {/* Sprint or Conventional Format */}
            <EventTypeBadge format={event.format} />
          </div>

          {/* Close Button */}
          <CircleX size={16} className='cursor-pointer' onClick={handleClose} />
        </div>

        {/* Event Name Link */}
        <Link
          href={'session/' + event.id}
          className='mb-1 text-2xl font-medium underline'
        >
          {event.name}
        </Link>

        {/* If event happened show results */}
        {/* {eventTiming(event.date) === 'past' && <TopThreeDrivers />} */}

        {/* Previous and Next Event Buttons */}
        {children}
      </div>
    </Popup>
  );
};

const EventTypeBadge = ({
  format,
}: {
  format?: Event_Format_Choices_Enum | null;
}) => {
  if (!format) return;
  return format === 'sprint' ? (
    <Badge className='z-10 w-fit rounded-full' variant='secondary'>
      Sprint
    </Badge>
  ) : (
    <Badge
      className='z-10 w-fit rounded-full bg-white text-black'
      variant='outline'
    >
      Conventional
    </Badge>
  );
};

// const TopThreeDrivers = () => {
//   return (
//     <div className='grid grid-cols-3 gap-2'>
//       {topThree.map((driver) => (
//         <div
//           key={driver.full_name}
//           className='grid items-center gap-1 rounded-lg p-2'
//           style={{
//             background: driver.constructor.color
//               ? bgGradient(driver.constructor.color)
//               : 'initial',
//           }}
//         >
//           <div className='flex'>
//             <p className='flex items-start text-4xl font-medium italic opacity-75'>
//               {driver.position}
//               <span className='text-base'>
//                 {positionEnding(driver.position)}
//               </span>
//             </p>
//             <Image
//               className='mx-auto'
//               src={driver.headshot_url}
//               width={60}
//               height={60}
//               alt={driver.full_name}
//             />
//           </div>
//           <div className='leading-3'>
//             <p className='text-sm'>{driver.full_name}</p>
//             <p className='text-xs'>{driver.constructor.name}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };
