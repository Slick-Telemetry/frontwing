export const CheckboxToggle = ({
  toggle,
  label,
}: {
  label: string;
  toggle: () => void;
}) => {
  return (
    <div className='flex items-center rounded-lg border px-4 py-2'>
      <input
        onChange={toggle}
        id='sessions-checkbox'
        type='checkbox'
        className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600'
      />
      <label htmlFor='sessions-checkbox' className='ms-2 text-sm font-medium'>
        {label}
      </label>
    </div>
  );
};
