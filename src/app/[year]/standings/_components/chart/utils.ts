export const makeLineSeries = (
  name: string,
  data: number[],
  color: string,
  lineType: 'solid' | 'dashed' | 'dotted' = 'solid',
) => ({
  name,
  type: 'line' as const,
  showSymbol: false,
  emphasis: { focus: 'series' as const },
  itemStyle: { color },
  lineStyle: { width: 2, type: lineType },
  data,
});

type Standing = { round?: number | null; points?: number | bigint | null };

export const prepareData = (
  standings: Standing[],
  allRounds: number[],
  delta: boolean = false,
) => {
  const byRound = new Map(
    standings
      .filter(
        (s): s is { round: number; points: number | bigint } =>
          s.round != null && s.points != null,
      )
      .map((s) => [s.round, Number(s.points)] as const),
  );

  let prev = 0;
  return allRounds.map((r) => {
    const curr = byRound.get(r) ?? prev;
    if (delta) {
      const delta = curr - prev;
      prev = curr;
      return delta;
    }
    // cumulative
    return (prev = curr);
  });
};
