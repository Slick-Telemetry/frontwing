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
    <label className='inline-flex cursor-pointer items-center gap-2'>
      <input
        onChange={toggle}
        type='checkbox'
        checked={checked}
        className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring focus:ring-blue-500'
      />
      <span className='text-sm font-medium'>{children}</span>
    </label>
  );
};
