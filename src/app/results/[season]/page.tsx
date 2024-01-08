'use client';

import { useAtom } from 'jotai';

import ResultsPage from '../SeasonResults';
import { handleSeasonChangeAtom } from '../../../atoms/results';

export default function Page({ params }: { params: { slug: string } }) {
  const [, handleSeasonChange] = useAtom(handleSeasonChangeAtom);
  handleSeasonChange(params.slug);

  return <ResultsPage />;
}
