import { create } from 'zustand';
import { useMemo } from 'react';

export interface Stock {
  industry_category: string;
  stock_id: string;
  stock_name: string;
  type: string;
  date: string;
}

export interface StockRevenue {
  date: string;
  stock_id: string;
  country: string;
  revenue: number;
  revenue_month: number;
  revenue_year: number;
  create_time: string;
  increase: number | null;
  revenueShort: number;
}

interface StockState {
  currentStock: Stock | null;
  currentRevenue: Array<StockRevenue>;
  yearPeriod: number;
  setCurrentStock: (newStock: Stock | null) => void;
  setCurrentRevenue: (newRevenue: Array<StockRevenue>) => void;
  setYearPeriod: (year: number) => void;
  isLoading: boolean;
  error: string;
  setIsLoading: (flag: boolean) => void;
  setError: (e: string) => void;
}

export const useStockStore = create<StockState>()((set) => ({
  currentStock: {
    industry_category: '',
    stock_id: '',
    stock_name: '',
    type: '',
    date: '',
  },
  currentRevenue: [],
  yearPeriod: 5,
  setCurrentStock: (newStock: Stock | null) => set({ currentStock: newStock }),
  setCurrentRevenue: (newRevenue: Array<StockRevenue>) => set({ currentRevenue: newRevenue }),
  setYearPeriod: (year: number) => set({ yearPeriod: year }),
  isLoading: false,
  error: '',
  setIsLoading: (flag: boolean) => set({ isLoading: flag }),
  setError: (e: string) => set({ error: e })
}))

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
