'use client';

import { clsx } from 'clsx';
import { atom, useAtom } from 'jotai';

import { RaceResults } from './RaceResults';

const tabHeaders = [
  'Race Results',
  'Drivers Championship',
  'Constructors Championship',
];
const tabs = [
  <RaceResults key='Race Results' />,
  <div key='Drivers Championship' className='rounded bg-base-100 p-4'>
    Tab 2
  </div>,
  <div key='Constructors Championship' className='rounded bg-base-100 p-4'>
    Tab 3
  </div>,
];
const tabView = atom<number>(0);
export default function Page() {
  // Testing Jotai & Atoms
  const [tabIndex, setTabIndex] = useAtom(tabView);

  // Active tab has matching tabIndex
  const TabButtons = tabHeaders.map((header, i) => (
    <a
      key={header}
      role='tab'
      className={clsx('tab', { 'tab-active': i === tabIndex })}
      onClick={() => setTabIndex(i)}
    >
      {header}
    </a>
  ));

  // Hide containers not matching tabIndex
  const TabContainers = tabs.map((tab, i) => (
    <div
      key={'tab' + i}
      className={clsx({
        hidden: i !== tabIndex,
      })}
    >
      {tab}
    </div>
  ));

  return (
    <main className='min-h-screen'>
      <div className='container mx-auto my-4'>
        <div role='tablist' className='tabs-boxed tabs my-4'>
          {TabButtons}
        </div>
        {TabContainers}
      </div>
    </main>
  );
}
