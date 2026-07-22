import { useMemo } from 'react';
import type { StockRevenue } from '@/stores/stockStore';
import { useStockStore } from '@/providers/stockProvider';

// displays revenue starting from the 13th month since the first year data is only used to calculate yearly increase
export function useDisplayRevenue(): StockRevenue[] {
  const currentRevenue = useStockStore((state) => state.currentRevenue);

  return useMemo(() => {
    if (!currentRevenue || currentRevenue.length === 0) {
      return [];
    }

    const revenues = currentRevenue.length < 13 ? currentRevenue: currentRevenue.slice(12)

    return revenues.map(r => { 
      const rawShort = r.revenue / 1000
      return {...r, revenueShort: Number.isFinite(rawShort) ? rawShort : 0}
    });
  }, [currentRevenue])
}

// displays yearly increase percentages from the raw revenue data
export function useDisplayYearlyIncrease(): StockRevenue[] {
  const currentRevenue = useStockStore((state) => state.currentRevenue);

  return useMemo(() => {
    if (!currentRevenue || currentRevenue.length === 0) {
      return [];
    } else if (currentRevenue.length < 13) {
      return currentRevenue.map(x => ({ ...x, increase: null }));
    }

    const increases: StockRevenue[] = []
    for (let i = 12; i < currentRevenue.length; i++) {
      const thisMonth = currentRevenue[i]
      const lastYearMonth = currentRevenue[i - 12]
      const increase = (thisMonth.revenue / lastYearMonth.revenue - 1) * 100;
      increases.push({ ...thisMonth, increase: Number.isFinite(increase) ? increase : null })
    }
    return increases
  }, [currentRevenue])
}
