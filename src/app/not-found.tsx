import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className='my-auto flex flex-1 items-center justify-center'>
      <div className='grid gap-4 rounded border p-4'>
        <div className='max-w-96'>
          <h2 className='text-4xl'>Page Not Found</h2>
          <hr className='my-2' />
          <p className='text-lg'>The page you are looking for does not exist</p>
        </div>

        <Button asChild>
          <Link href='/'>Home</Link>
        </Button>
      </div>
    </div>
  );
}
