import { Switch } from '@/components/ui/switch';

export const CheckboxToggle = ({
  toggle,
  children,
  checked,
}: {
  toggle: () => void;
  children: React.ReactNode;
  checked: boolean;
}) => {
  return (
    <label htmlFor='details' className='flex cursor-pointer items-center gap-2'>
      <Switch id='details' onClick={toggle} checked={checked} />
      <span className='text-sm font-medium'>{children}</span>
    </label>
  );
};
