import { Badge } from '@/components/ui/badge';

import { Event_Format_Choices_Enum } from '@/generated/types';

export const EventTypeBadge = ({
  format,
}: {
  format?: Event_Format_Choices_Enum | null;
}) => {
  if (!format) return;
  return ['sprint', 'sprint_shootout', 'sprint_qualifying'].includes(format) ? (
    <Badge className='z-10 w-fit rounded-full' variant='secondary'>
      Sprint
    </Badge>
  ) : (
    <Badge
      className='z-10 w-fit rounded-full bg-white text-black'
      variant='outline'
    >
      Conventional
    </Badge>
  );
};
