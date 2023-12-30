'use client';

import { Fragment } from 'react';

interface ITable {
  title?: string;
  headings: string[];
  data: { [key: string]: React.ReactNode }[];
}

export const Table = ({ title, headings, data }: ITable) => {
  if (data.length <= 0 && headings.length <= 0) return;

  const Title = title && <h2 className='text-xl'>{title}</h2>;

  return (
    <>
      {Title}
      <div className='overflow-x-auto'>
        <table className='table'>
          {/* head */}
          <thead>
            <tr>
              {headings.map((header) => (
                <th
                  key={header}
                  className='uppercase'
                  suppressHydrationWarning={true}
                >
                  {header.replace('_', ' ')}
                </th>
              ))}
              <th>{/* Placeholder for button */}</th>
            </tr>
          </thead>
          {/* body */}
          <tbody>
            {data.length > 0 &&
              data.map((row, i) => (
                <Fragment key={title + '-' + i}>
                  <tr
                  // fontWeight={700}
                  // bgGradient={`linear(to-r, #ffffff, #${row.color})`}
                  >
                    {headings.map(
                      (key) =>
                        row && (
                          <td key={key} suppressHydrationWarning={true}>
                            {row[key]}
                          </td>
                        ),
                    )}
                    <th>
                      <button className='btn btn-ghost btn-xs'>details</button>
                    </th>
                  </tr>
                </Fragment>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
