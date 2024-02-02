'use client';

import { useAtom } from 'jotai';

import { handleSeasonChangeAtom } from '@/atoms/seasons';

import ResultsPage from '../SeasonResults';

export default function Page({ params }: { params: { season: string } }) {
  const [, handleSeasonChange] = useAtom(handleSeasonChangeAtom);
  handleSeasonChange(params.season);

  return <ResultsPage />;
}
