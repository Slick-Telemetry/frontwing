'use client';
import {
  ChevronDown,
  ChevronUp,
  FileText,
  Loader2,
  Search,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';

import { FragmentType, graphql, useFragment } from '@/types';
import { FiaDocsFragment } from '@/types/graphql';

const FIADocsFragment = graphql(`
  fragment FIADocs on fia_documents {
    title
    url
    publish_time
  }
`);

type FIADocsProps = {
  documents: FragmentType<typeof FIADocsFragment>[];
  loading?: boolean;
};

export function FIADocs({ loading, ...props }: FIADocsProps) {
  const documents = useFragment(FIADocsFragment, props?.documents);
  const [viewingDocs, setViewingDocs] = useState<FiaDocsFragment[]>(documents);
  const [ascending, setAscending] = useState(false);

  useEffect(() => {
    setViewingDocs(documents);
  }, [documents]);

  const handleOrderChange = (asc: boolean) => {
    const sortedDocs = [...viewingDocs].sort((a, b) =>
      asc
        ? new Date(a.publish_time).getTime() -
          new Date(b.publish_time).getTime()
        : new Date(b.publish_time).getTime() -
          new Date(a.publish_time).getTime(),
    );
    setViewingDocs(sortedDocs);
    setAscending(asc);
  };

  const handleSearchChange = (searchInput: string) => {
    const filteredDocs = documents.filter((d) =>
      d.title.toLowerCase().includes(searchInput.toLowerCase()),
    );
    setViewingDocs(filteredDocs);
  };

  return (
    <>
      <h2 className='scroll-m-20 text-3xl font-semibold tracking-tight'>
        FIA Docs
      </h2>
      <div className='flex gap-2 px-px pb-2'>
        <InputGroup>
          <InputGroupInput
            disabled={loading}
            onPaste={(e) => handleSearchChange(e.clipboardData.getData('text'))}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder='Search...'
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align='inline-end'>
            {loading ? (
              <Loader2 className='animate-spin' />
            ) : (
              `${viewingDocs.length} docs`
            )}
          </InputGroupAddon>
        </InputGroup>
        <Button
          variant='outline'
          className='mx-[3px] min-w-[110px] whitespace-nowrap'
          onClick={() => handleOrderChange(!ascending)}
        >
          {ascending ? (
            <>
              <ChevronUp /> Oldest
            </>
          ) : (
            <>
              <ChevronDown /> Newest
            </>
          )}
        </Button>
      </div>

      <div className='relative flex-1 overflow-y-scroll'>
        <div className='from-background sticky top-0 h-4 bg-linear-to-b to-transparent'></div>
        <ul className='-mt-2 px-[3px]'>
          {loading ? (
            <FIADocSkeleton />
          ) : (
            viewingDocs.map((doc) => (
              <li key={doc.url ?? doc.title} className='pt-2 first:pt-0'>
                <FIADocButton {...doc} />
              </li>
            ))
          )}
          {!loading && viewingDocs.length === 0 && (
            <p className='text-muted-foreground py-4 text-center text-sm'>
              No documents found.
            </p>
          )}
        </ul>
        <div className='from-background sticky bottom-0 h-4 bg-linear-to-t to-transparent'></div>
      </div>
    </>
  );
}

function FIADocButton(doc: FiaDocsFragment) {
  return (
    <Button
      variant='outline'
      disabled={!doc.url}
      className='group h-fit w-full text-left xl:gap-4'
      aria-label={doc.title}
      onClick={() =>
        doc.url &&
        window.open(
          `https://docs.google.com/gview?embedded=true&url=${doc.url}`,
          // '_blank',
        )
      }
    >
      <FileText className='group-focus:stroke-accent group-hover:stroke-accent size-8' />
      <div className='w-full'>
        <p className='line-clamp-2 leading-snug tracking-tight text-pretty'>
          {doc.title}
        </p>
        <p className='text-sm font-normal'>
          {new Date(doc.publish_time).toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            // hourCycle: 'h24',
          })}
        </p>
      </div>
    </Button>
  );
}

function FIADocSkeleton() {
  return Array.from({ length: 10 }).map((_, idx) => (
    <li key={`fia-doc-skeleton-${idx}`} className='pt-2 first-of-type:pt-0'>
      <Button
        variant='outline'
        disabled
        className='h-fit w-full text-left disabled:opacity-80 xl:gap-4'
      >
        <FileText className='stroke-muted size-8 animate-pulse' />
        <div className='w-full space-y-2'>
          <div className='bg-muted h-4 w-3/4 rounded-md' />
          <div className='bg-muted h-3 w-1/4 rounded-md' />
        </div>
      </Button>
    </li>
  ));
}
