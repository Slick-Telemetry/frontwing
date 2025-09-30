import { Switch } from '@/components/ui/switch';

export const CheckboxToggle = ({
  toggle,
  children,
  checked,
  id = 'details',
}: {
  toggle: () => void;
  children: React.ReactNode;
  checked: boolean;
  id?: string;
}) => {
  return (
    <label htmlFor={id} className='flex cursor-pointer items-center gap-2'>
      <Switch id={id} onClick={toggle} checked={checked} />
      <span className='text-xs md:text-sm'>{children}</span>
    </label>
  );
};
