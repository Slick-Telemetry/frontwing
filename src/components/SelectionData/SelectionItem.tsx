export const SelectionItem = ({
  children,
  clickHandler,
}: {
  children: React.ReactNode | React.ReactNode[];
  clickHandler: () => void;
}) => {
  return (
    <a
      onClick={clickHandler}
      tabIndex={0}
      className='cursor-pointer bg-card px-4 py-2 text-card-foreground hover:bg-accent hover:text-accent-foreground'
    >
      {children}
    </a>
  );
};
