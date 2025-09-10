import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export function QuickLinks({ year }: { year: string }) {
  const links = [
    {
      name: 'Season Map',
      href: `${year}/map`,
      description: 'View the travel of the season',
    },
    { name: 'Head to Head', href: '#', description: 'Compare driver results' },
  ] as { name: string; href: string; description?: string }[];
  return (
    <div
      className='grid gap-4'
      style={{ gridTemplateColumns: `repeat(${links.length}, 1fr)` }}
    >
      {links.map(({ name, href, description }) =>
        href === '#' ? (
          <div
            key={href}
            className='rounded border border-dashed px-4 py-2 opacity-50'
            title='Coming soon'
          >
            <div className='flex w-full cursor-not-allowed items-center justify-between text-xl font-bold'>
              {name}
              <ExternalLink />
            </div>
            {description && <p>{description}</p>}
          </div>
        ) : (
          <Link
            key={href}
            href={href}
            className='group hover:bg-muted rounded border px-4 py-2 transition-colors'
            aria-label={`${name}, ${description ?? ''}`}
          >
            <div className='flex w-full items-center justify-between text-xl font-bold group-hover:underline'>
              {name}
              <ExternalLink />
            </div>
            {description && <p>{description}</p>}
          </Link>
        ),
      )}
    </div>
  );
}
