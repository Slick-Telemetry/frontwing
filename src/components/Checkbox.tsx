export const CheckboxToggle = ({
  toggle,
  children,
}: {
  toggle: () => void;
  children: React.ReactNode;
}) => {
  return (
    <label className='flex cursor-pointer items-center gap-2'>
      <input
        onChange={toggle}
        type='checkbox'
        className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring focus:ring-blue-500'
      />
      <span className='text-sm font-medium'>{children}</span>
    </label>
  );
};
