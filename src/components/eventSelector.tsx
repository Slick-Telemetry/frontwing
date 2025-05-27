'use client';

import { useQuery } from '@apollo/client';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import { GET_SEASON_EVENTS } from '@/lib/queries';
import { eventLocationDecode } from '@/lib/utils';

import { Loader } from '@/components/Loader';

import {
  GetSeasonEventsQuery,
  GetSeasonEventsQueryVariables,
} from '@/generated/types';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const EventSelector = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { year, event } = useParams();
  const eventLoc = eventLocationDecode(event as string);

  const {
    data,
    loading,
    error: _error,
  } = useQuery<GetSeasonEventsQuery, GetSeasonEventsQueryVariables>(
    GET_SEASON_EVENTS,
    {
      variables: {
        year: parseInt(year as string),
      },
    },
  );

  if (loading)
    return (
      <Select>
        <SelectTrigger className='w-24'>
          <SelectValue placeholder={<Loader size={24} />} />
        </SelectTrigger>
      </Select>
    );

  const activeEvent = eventLoc
    ? data?.schedule.find((event) => event.location === eventLoc)?.event_name
    : data?.schedule[0]?.event_name;

  const handleEventChange = (newEvent: string) => {
    const urlSegments = pathname.split('/');
    if (urlSegments[2]) urlSegments[2] = newEvent;
    const newPath = urlSegments.join('/');
    const newUrl = `${newPath}?${searchParams.toString()}`;
    router.push(newUrl);
  };

  return (
    <Select
      disabled={!data || data.schedule.length === 0}
      onValueChange={(val) => handleEventChange(val)}
    >
      <SelectTrigger className='w-48'>
        <SelectValue placeholder={activeEvent} />
      </SelectTrigger>
      <SelectContent>
        {data?.schedule.map(
          ({ event_name }) =>
            event_name && (
              <SelectItem key={event_name} value={event_name}>
                {event_name}
              </SelectItem>
            ),
        )}
      </SelectContent>
    </Select>
  );
};

export default EventSelector;
