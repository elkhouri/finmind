import { create } from 'zustand'

interface Stock {
  industry_category: string;
  stock_id: string;
  stock_name: string;
  type: string;
  date: string;
}

interface StockState {
  currentStock: Stock | null;
  setCurrentStock: (newStock: Stock) => void;
}

export const useStockStore = create<StockState>()((set) => ({
  currentStock: {
    industry_category: '',
    stock_id: '',
    stock_name: '',
    type: '',
    date: ''
  },
  setCurrentStock: (newStock: Stock) => set({ currentStock: newStock }),
}))
