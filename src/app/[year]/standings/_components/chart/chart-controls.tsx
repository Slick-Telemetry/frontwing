import { CheckboxToggle } from '@/components/Checkbox';
import { Separator } from '@/components/ui/separator';

export const ChartControls = ({
  hideTooltip,
  toggleTooltip,
  showRoundPoints,
  toggleRoundPoints,
}: {
  hideTooltip: boolean;
  toggleTooltip: () => void;
  showRoundPoints: boolean;
  toggleRoundPoints: () => void;
}) => (
  <div className='ml-auto flex w-fit items-center gap-4 p-4 pb-2'>
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
);
