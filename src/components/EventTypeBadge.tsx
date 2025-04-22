import { Badge } from '@/components/ui/badge';

export const EventTypeBadge = ({
  format,
}: {
  // format?: Event_Format_Choices_Enum | null;
  format?: string | null;
}) => {
  if (!format) return;
  return ['sprint', 'sprint_shootout', 'sprint_qualifying'].includes(format) ? (
    <Badge
      data-cy='event-badge'
      className='z-10 w-fit rounded-full'
      variant='secondary'
    >
      Sprint
    </Badge>
  ) : null;
};
