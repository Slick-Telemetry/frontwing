import { CheckboxToggle } from '@/components/Checkbox';
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
      <CheckboxToggle id='htt' toggle={toggleTooltip} checked={hideTooltip}>
        Hide Tooltip
      </CheckboxToggle>

      <Separator
        orientation='vertical'
        className='data-[orientation=vertical]:h-4'
      />
      <CheckboxToggle
        id='ppr'
        toggle={toggleRoundPoints}
        checked={showRoundPoints}
      >
        Points Per Round
      </CheckboxToggle>
      {/* <CheckboxToggle
            toggle={() => setItemTooltip((prev) => !prev)}
            checked={itemTooltip}
            >
            Single Item
            </CheckboxToggle> */}
    </div>
  </div>
);
