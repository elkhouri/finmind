import { createStore } from 'zustand';

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

export interface StockState  {
  currentStock: Stock | null;
  currentRevenue: Array<StockRevenue>;
  yearPeriod: number;
  isLoading: boolean;
  error: string;
}

export interface StockAction {
  setIsLoading: (flag: boolean) => void;
  setError: (e: string) => void;
  setCurrentStock: (newStock: Stock | null) => void;
  setCurrentRevenue: (newRevenue: Array<StockRevenue>) => void;
  setYearPeriod: (year: number) => void;
}

export type StockStore = StockState & StockAction

export const createStockStore = () => createStore<StockStore>()((set) => ({
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
