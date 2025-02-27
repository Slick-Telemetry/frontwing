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

export const Loader = () => (
  <div className='animate-spin'>
    <LoaderCircle size={48} />
  </div>
);
