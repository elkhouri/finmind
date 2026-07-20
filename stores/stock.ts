import { create } from 'zustand'

interface Stock {
  industry_category: string;
  stock_id: string;
  stock_name: string;
  type: string;
  date: string;
}

interface StockRevenue {
  "date": string,
  "stock_id": string,
  "country": string,
  "revenue": number,
  "revenue_month": number,
  "revenue_year": number,
  "create_time": string
}

interface StockState {
  currentStock: Stock | null;
  currentRevenue: Array<StockRevenue>;
  setCurrentStock: (newStock: Stock) => void;
  setCurrentRevenue: (newRevenue: Array<StockRevenue>) => void;
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
  setCurrentStock: (newStock: Stock) => set({ currentStock: newStock }),
  setCurrentRevenue: (newRevenue: Array<StockRevenue>) => set({ currentRevenue: newRevenue })
}))
