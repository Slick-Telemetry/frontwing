import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='container flex min-h-[60vh] items-center justify-center'>
      <div className='max-w-96 rounded border border-current p-4'>
        <div className='mb-4'>
          <h2 className='text-2xl'>Page Not Found</h2>
          <p className='text-lg'>
            The page you are looking for does not exist. Please check the URL
            and try again.
          </p>
        </div>

        <Link href='/dashboard'>
          <button className='rounded border border-current px-3 py-1 '>
            Return to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}
