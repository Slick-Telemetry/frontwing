'use client';

import { Selection } from './Selection';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

export const SelectionGroup = (props: {
  title: string;
  active?: boolean;
  disabled?: boolean;
}) => {
  return (
    <Accordion
      type='multiple'
      defaultValue={!props.disabled ? [props.title] : []}
    >
      <AccordionItem value={props.title}>
        <AccordionTrigger disabled={props.disabled} className='gap-4 py-0'>
          <Selection {...props} className='w-full' />
        </AccordionTrigger>
        <AccordionContent>
          <div className='flex flex-col'>
            <Selection title='Query 1' />
            <Selection title='Query 2' />
            <Selection title='Query 3' />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
