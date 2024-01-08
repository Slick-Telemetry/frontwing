// 'use client';
import { BsFillCaretDownFill } from 'react-icons/bs';

interface IDropdown {
  value: string;
  items: string[];
  action: () => void;
}

export const Dropdown = ({ value, items, action }: IDropdown) => (
  <div className='dropdown'>
    <div tabIndex={0} role='button' className='btn btn-ghost rounded-btn'>
      {value} <BsFillCaretDownFill />
    </div>
    <ul
      tabIndex={0}
      className='menu dropdown-content z-[1] mt-4 max-h-96 w-52 flex-nowrap overflow-scroll rounded-box bg-base-100 p-2 shadow'
    >
      {items.map((item) => (
        <li key={item}>
          <a onClick={action}>{item}</a>
        </li>
      ))}
    </ul>
  </div>
);
