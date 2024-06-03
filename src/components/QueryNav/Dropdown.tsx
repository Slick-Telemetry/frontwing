import { CaretDownFill } from '@/components/icons/CaretDownFill';

import {
  DropdownMenu,
  DropdownMenuContent,
  // DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface IDropdown {
  value: string;
  label?: string;
  // items: string[];
  action: (item: string) => void;
  children: false | React.JSX.Element[];
}

export const DropdownItem = ({ item }: { item: string }) => {
  return <DropdownMenuRadioItem value={item}>{item}</DropdownMenuRadioItem>;
};

export const Dropdown = ({ value, action, children }: IDropdown) => {
  const handleClick = (item: string) => {
    action(item);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={value === 'Loading' || (children && children.length === 0)}
        className='flex items-center gap-x-2 rounded-full px-4 py-2 disabled:text-muted-foreground'
      >
        <span data-cy='dropdown'>{value}</span>
        <CaretDownFill />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='max-h-56 overflow-scroll'>
        <DropdownMenuRadioGroup value={value} onValueChange={handleClick}>
          {children}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
