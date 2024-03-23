import React from 'react';
import { BsFillCaretDownFill } from 'react-icons/bs';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface IDropdown {
  value: string;
  label?: string;
  items: string[];
  action: (item: string) => void;
}

export const Dropdown = ({ value, label, items, action }: IDropdown) => {
  const handleClick = (item: string) => {
    action(item);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={items.length <= 0}
        className='flex items-center gap-x-2 rounded-full px-4 py-2 disabled:text-muted-foreground'
      >
        {value} <BsFillCaretDownFill />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='max-h-56 overflow-scroll'>
        {label && (
          <>
            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuRadioGroup value={value} onValueChange={handleClick}>
          {items?.map((item) => (
            <DropdownMenuRadioItem key={item} value={item}>
              {item}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
