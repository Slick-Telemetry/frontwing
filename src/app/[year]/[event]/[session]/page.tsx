import { Suspense } from 'react';

import { PreloadQuery } from '@/lib/client';
import { GET_SESSION_RESULTS } from '@/lib/queries';
import { eventLocationDecode } from '@/lib/utils';

import SessionResultsSkeleton from '@/app/[year]/[event]/[session]/sessionResultsSkeleton';
import { Session_Name_Choices_Enum } from '@/generated/types';

import { SessionResults } from '.';

export default async function SessionPage({
  params,
}: {
  params: Promise<{ year: string; event: string; session: string }>;
}) {
  const { year, event, session } = await params;
  return (
    <div className='container mx-auto py-2'>
      <PreloadQuery
        query={GET_SESSION_RESULTS}
        variables={{
          year: parseInt(year),
          event: eventLocationDecode(event),
          session: eventLocationDecode(session) as Session_Name_Choices_Enum,
        }}
      >
        <Suspense fallback={<SessionResultsSkeleton />}>
          <SessionResults year={year} event={event} session={session} />
        </Suspense>
      </PreloadQuery>
    </div>
  );
}
