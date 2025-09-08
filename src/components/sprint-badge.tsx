import { Badge } from '@/components/ui/badge';

import { Event_Format_Choices_Enum } from '@/types/graphql';

export const SprintBadge = ({
  format,
}: {
  format?: Event_Format_Choices_Enum | null;
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
