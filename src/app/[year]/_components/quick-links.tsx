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
          <div key={href} className='rounded border px-4 py-2'>
            <Link
              href={href}
              className='flex w-full items-center justify-between text-xl font-bold hover:underline'
            >
              {name}
              <ExternalLink />
            </Link>
            {description && <p>{description}</p>}
          </div>
        ),
      )}
    </div>
  );
}
