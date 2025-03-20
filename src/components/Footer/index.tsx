'use client';

function Footer() {
  return (
    <div className='container mt-auto grid items-center py-6 md:grid-cols-2'>
      <div className='flex flex-col flex-wrap gap-x-4 md:flex-row'>
        <div className='flex items-center gap-1'>
          <a className='italic' href='mailto:contact@slicktelemetry.com'>
            contact@slicktelemetry.com
          </a>
        </div>
        <div className='flex items-center gap-1 uppercase'>
          <a
            href='https://github.com/Slick-Telemetry'
            target='_blank'
            rel='noreferrer'
          >
            Github
          </a>
        </div>
        <div className='flex items-center gap-1'>
          <a
            href='https://www.freeprivacypolicy.com/live/7a491ef5-7aec-436f-97ae-34f04319fe5c'
            target='_blank'
            rel='noreferrer'
          >
            Terms of Service
          </a>
        </div>
      </div>
      <div className='mt-4 md:order-first md:mt-0'>
        <p>Copyright © 2025, Slick Telemetry</p>
        <p className='text-xs'>
          This website is not associated in with any Formula&nbsp;1 companies
        </p>
      </div>
    </div>
  );
}

export { Footer };
