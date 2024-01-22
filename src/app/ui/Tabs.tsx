import clsx from 'clsx';
import { atom, useAtom } from 'jotai';

const tabView = atom<number>(0);

interface ITabs {
  headers: string[];
  containers: React.ReactNode[];
}

export const Tabs = ({ headers, containers }: ITabs) => {
  // Testing Jotai & Atoms
  const [tabIndex, setTabIndex] = useAtom(tabView);

  // Active tab has matching tabIndex
  const TabButtons = headers.map((header, i) => {
    const switchTabs = () => {
      setTabIndex(i);
      window.scrollTo(0, 0);
    };
    return (
      <a
        key={header}
        role='tab'
        className={clsx('tab mx-2 border  bg-base-100 hover:bg-base-300', {
          'tab-active': i === tabIndex,
        })}
        onClick={switchTabs}
      >
        {header}
      </a>
    );
  });

  // Hide containers not matching tabIndex
  const TabContainers = containers.map((tab, i) => (
    <div
      key={headers[i]}
      className={clsx({
        hidden: i !== tabIndex,
      })}
    >
      {tab}
    </div>
  ));

  return (
    <div className='container mx-auto mt-4 pb-24'>
      {TabContainers}
      <div className='fixed bottom-0 left-0 right-0 mx-auto max-w-screen-md lg:bottom-16 '>
        <div role='tablist' className='tabs-boxed tabs bg-black p-2 shadow-md'>
          {TabButtons}
        </div>
      </div>
    </div>
  );
};
