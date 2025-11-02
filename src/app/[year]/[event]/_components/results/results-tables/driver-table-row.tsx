import React from 'react';

import { formatLapTime } from '@/lib/utils';

import { ConstructorBadge } from '@/components/constructor-badge';
import { Badge } from '@/components/ui/badge';
import {
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { EventSessionResults } from '@/types/global';
import {
  EventCompetitionResultsFragment,
  EventPracticeResultsFragment,
} from '@/types/graphql';

export function DriverRow({
  s,
  idx,
  children,
}: {
  s: EventSessionResults;
  idx: number;
  children?: React.ReactNode;
}) {
  return (
    <TableRow key={s.driver?.full_name}>
      <TableCell className='text-center'>{idx + 1}</TableCell>
      <TableCell className='font-medium'>
        {s.driver?.full_name}
        <br className='md:hidden' />
        <ConstructorBadge
          className='md:hidden'
          color={s.constructorByConstructorId?.color}
          name={s.constructorByConstructorId?.name}
        />
      </TableCell>
      <TableCell className='hidden md:table-cell'>
        <ConstructorBadge
          className='block w-full text-center'
          color={s.constructorByConstructorId?.color}
          name={s.constructorByConstructorId?.name}
        />
      </TableCell>
      {children}
    </TableRow>
  );
}

export function FastestLapCell({
  fastest_lap,
}: {
  fastest_lap?:
    | EventCompetitionResultsFragment['driver_sessions'][number]['fastest_lap']
    | EventPracticeResultsFragment['driver_sessions'][number]['fastest_lap'];
}) {
  return (
    <TableCell>
      {fastest_lap?.[0]?.lap_time ? (
        <>
          <span className='inline-block w-16'>
            {formatLapTime(fastest_lap[0]?.lap_time)}
          </span>{' '}
          <Badge variant='outline'>Lap {fastest_lap[0]?.lap_number}</Badge>
        </>
      ) : (
        '--------'
      )}
    </TableCell>
  );
}

export function HeaderRow({ children }: { children?: React.ReactNode }) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className='w-12 text-center'>Pos.</TableHead>
        <TableHead>Driver</TableHead>
        <TableHead className='hidden w-28 md:table-cell'>Constructor</TableHead>
        {children}
      </TableRow>
    </TableHeader>
  );
}
