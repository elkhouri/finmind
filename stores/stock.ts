import { create } from 'zustand'

interface Stock {
  industry_category: string;
  stock_id: string;
  stock_name: string;
  type: string;
  date: string;
}

export interface StockRevenue {
  date: string,
  stock_id: string,
  country: string,
  revenue: number,
  revenue_month: number,
  revenue_year: number,
  create_time: string,
  increase?: number
}

interface StockState {
  currentStock: Stock | null;
  currentRevenue: Array<StockRevenue>;
  yearPeriod: number;
  setCurrentStock: (newStock: Stock) => void;
  setCurrentRevenue: (newRevenue: Array<StockRevenue>) => void;
  setYearPeriod: (year: number) => void;
}

export const useStockStore = create<StockState>()((set) => ({
  currentStock: {
    industry_category: '',
    stock_id: '',
    stock_name: '',
    type: '',
    date: ''
  },
  currentRevenue: [],
  yearPeriod: 5,
  setCurrentStock: (newStock: Stock) => set({ currentStock: newStock }),
  setCurrentRevenue: (newRevenue: Array<StockRevenue>) => set({ currentRevenue: newRevenue }),
  setYearPeriod: (year: number) => set({ yearPeriod: year })
}))

export function useDisplayStock() {
  const currentRevenue = useStockStore((state) => state.currentRevenue);
  if (!currentRevenue || currentRevenue.length === 0) {
    return [];
  }
  return currentRevenue.slice(12);
}

export function useDisplayYearlyIncrease() {
  const currentRevenue = useStockStore((state) => state.currentRevenue);
  if (!currentRevenue || currentRevenue.length === 0) {
    return [];
  }
  return currentRevenue.reduce<StockRevenue[]>((acc, month) => {
    const nowDate = new Date(month.date);
    const lastYearDate = new Date(nowDate);
    lastYearDate.setFullYear(lastYearDate.getFullYear() - 1);

    const day = currentRevenue.find(
      (day) =>
        new Date(day.date).getFullYear() === lastYearDate.getFullYear() &&
        new Date(day.date).getMonth() === lastYearDate.getMonth(),
    );

    if (!day) {
      return acc;
    }
    
    const increase = (month.revenue / day.revenue - 1) * 100;
    const newMonth = { ...month, increase };
    acc.push(newMonth);
    return acc;
  }, []);
}
