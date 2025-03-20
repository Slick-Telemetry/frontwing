import clsx from 'clsx';

export const FloatingNumber = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={clsx(
        'absolute text-4xl font-bold italic opacity-25 lg:text-8xl',
        props.className,
      )}
    >
      {children}
    </div>
  );
};
