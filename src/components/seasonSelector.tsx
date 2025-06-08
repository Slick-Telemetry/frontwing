'use client';

import { useQuery } from '@apollo/client';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import { GET_SEASONS } from '@/lib/queries';

import { Loader } from '@/components/Loader';

import { GetSeasonsQuery, GetSeasonsQueryVariables } from '@/generated/types';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const SeasonSelector = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { year } = useParams<{ year: string }>();

  const { data, loading, error } = useQuery<
    GetSeasonsQuery,
    GetSeasonsQueryVariables
  >(GET_SEASONS);
  const events = data?.events || [];

  if (loading)
    return (
      <Select>
        <SelectTrigger className='w-24'>
          <SelectValue placeholder={<Loader size={24} />} />
        </SelectTrigger>
      </Select>
    );
  if (error) return <p>Error loading seasons!</p>;

  const handleSeasonChange = (newSeason: string) => {
    const urlSegments = pathname.split('/');
    if (urlSegments[1]) urlSegments[1] = newSeason;
    const newPath = urlSegments.join('/');
    const newUrl = `${newPath}?${searchParams.toString()}`;
    router.push(newUrl);
  };

  return (
    <Select
      value={year.toString()}
      onValueChange={(val) => handleSeasonChange(val)}
    >
      <SelectTrigger className='w-24'>
        <SelectValue placeholder={year} />
      </SelectTrigger>
      <SelectContent>
        {events.map(
          ({ year }) =>
            year && (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ),
        )}
      </SelectContent>
    </Select>
  );
};

export default SeasonSelector;
