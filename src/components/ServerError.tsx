export const ServerPageError = ({ msg }: { msg?: string }) => {
  return (
    <div className='my-auto flex flex-1 items-center justify-center'>
      <div className='grid gap-4 rounded border p-4'>
        <div>
          <h1>Server Error</h1>
          <p className='text-4xl'>{msg || 'Please try again soon'}</p>
        </div>
        {/* <div className='text-red-500 rounded border border-current p-2 px-3'>
            <p>{error.name}: {error.message}</p>
          </div> */}
        <ul className='ml-4 list-disc'>
          <li>
            You may reach out to{' '}
            <a className='underline' href='mailto:contact@slicktelemetry.com'>
              contact@slicktelemetry.com
            </a>
          </li>
          <li>
            Feeling confident? Create an issue on{' '}
            <a
              className='underline'
              href='https://github.com/Slick-Telemetry/frontwing/issues/new/choose'
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export const ServerComponentError = () => {
  return (
    <div data-cy='season-selector-error'>
      <h1 className='text-xl'>Server Error</h1>
      <p className='text-sm'>Please try again</p>
    </div>
  );
};
