import { Toggle } from '@/components/toggle';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const ChartControls = ({
  hideTooltip,
  toggleTooltip,
  showRoundPoints,
  toggleRoundPoints,
  toggleVisibility,
}: {
  hideTooltip: boolean;
  toggleTooltip: () => void;
  showRoundPoints: boolean;
  toggleRoundPoints: () => void;
  toggleVisibility: (string: 'all' | 'none') => void;
}) => (
  <div className='flex items-center gap-4 p-4'>
    <Button
      variant='outline'
      size='sm'
      // className='h-6'
      onClick={() => toggleVisibility('all')}
    >
      Select All
    </Button>
    <Button
      variant='outline'
      size='sm'
      // className='h-6'
      onClick={() => toggleVisibility('none')}
    >
      Clear All
    </Button>
    <div className='ml-auto flex w-fit items-center gap-4'>
      <Toggle id='htt' toggle={toggleTooltip} checked={hideTooltip}>
        Hide Tooltip
      </Toggle>

      <Separator
        orientation='vertical'
        className='data-[orientation=vertical]:h-4'
      />
      <Toggle id='ppr' toggle={toggleRoundPoints} checked={showRoundPoints}>
        Points Per Round
      </Toggle>
      {/* <CheckboxToggle
            toggle={() => setItemTooltip((prev) => !prev)}
            checked={itemTooltip}
            >
            Single Item
            </CheckboxToggle> */}
    </div>
  </div>
);
