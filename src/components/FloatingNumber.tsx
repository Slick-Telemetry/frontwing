import clsx from 'clsx';

export const FloatingNumber = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={clsx('font-bold italic opacity-25', props.className)}
    >
      {children}
    </div>
  );
};
