import clsx from 'clsx';

export const Timeline = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <ul className='timeline timeline-vertical timeline-snap-icon max-md:timeline-compact'>
      {children}
    </ul>
  );
};

interface TimelineElProps {
  first: boolean;
  last: boolean;
  odd: boolean;
  children: React.ReactNode;
}

export const TimelineElement = ({
  first,
  last,
  odd,
  children,
}: TimelineElProps) => (
  <li>
    {!first && <hr />}
    <TimelineMarker />
    <div
      className={clsx('timeline-end timeline-box !mb-10', {
        'md:timeline-start md:text-end': !odd,
      })}
    >
      {children}
    </div>
    {!last && <hr />}
  </li>
);

const TimelineMarker = () => (
  <div className='timeline-middle mx-2'>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      fill='currentColor'
      className='h-4 w-4'
    >
      <circle cx='10' cy='10' r='6' />
    </svg>
  </div>
);
