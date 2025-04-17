import { LoaderCircle } from 'lucide-react';

export const FullHeightLoader = ({
  children,
}: {
  children?: React.ReactNode;
}) => (
  <div className='flex h-svh flex-col items-center justify-center'>
    <Loader />

    {children}
  </div>
);

export const Loader = ({ size = 48 }: { size?: number }) => (
  <div className='h-fit w-fit animate-spin'>
    <LoaderCircle size={size} />
  </div>
);
