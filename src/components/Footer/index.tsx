'use client';

import { useAtom } from 'jotai';
import { FileTextIcon, GithubIcon, MailIcon } from 'lucide-react';

import { incrementalHealthCheck } from '@/state-mgmt/store';

function Footer() {
  useAtom(incrementalHealthCheck);

  return (
    <div className='container mb-4 mt-8 flex min-h-24 flex-col justify-between md:flex-row'>
      <div className='flex flex-col gap-y-2'>
        <div className='flex gap-x-2'>
          <MailIcon />
          <a className='italic' href='mailto:contact@slicktelemetry.com'>
            contact@slicktelemetry.com
          </a>
        </div>
        <div className='flex gap-x-2'>
          <GithubIcon />
          <a
            href='https://github.com/Slick-Telemetry'
            target='_blank'
            rel='noreferrer'
          >
            Github
          </a>
        </div>
        <div className='flex gap-x-2'>
          <FileTextIcon />
          <a
            href='https://www.freeprivacypolicy.com/live/7a491ef5-7aec-436f-97ae-34f04319fe5c'
            target='_blank'
            rel='noreferrer'
          >
            Terms of Service
          </a>
        </div>
      </div>
      <div>
        <p>Copyright © 2024, Slick Telemetry</p>
        <p className='max-w-96'>
          This website is not associated in with any Formula&nbsp;1 companies
        </p>
      </div>
    </div>
  );
}

export { Footer };
