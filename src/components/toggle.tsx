import { useLocalStorage } from '@/hooks/use-storage';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export function Toggle({
  checked,
  toggle,
  id,
  children,
}: {
  checked: boolean;
  toggle: () => void;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className='flex cursor-pointer items-center gap-2'>
      <Switch id={id} onClick={toggle} checked={checked} />
      <Label htmlFor={id}>{children}</Label>
    </div>
  );
}

export function ToggleLocalStorage({
  id,
  children,
  initial,
}: {
  children: React.ReactNode;
  initial: boolean;
  id: string;
}) {
  const [checked, setChecked] = useLocalStorage(id, initial);
  return (
    <div className='flex cursor-pointer items-center gap-2'>
      <Switch id={id} onClick={() => setChecked(!checked)} checked={checked} />
      <Label htmlFor={id}>{children}</Label>
    </div>
  );
}
