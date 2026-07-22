'use client'

import { type ReactNode, createContext, useState, useContext } from 'react'
import { useStore } from 'zustand'

import { type StockStore, createStockStore } from '@/stores/stockStore'

export type StockStoreApi = ReturnType<typeof createStockStore>

export const StockStoreContext = createContext<StockStoreApi | undefined>(
  undefined,
)

export interface StockStoreProviderProps {
  children: ReactNode
}

export const StockStoreProvider = ({
  children,
}: StockStoreProviderProps) => {
  const [store] = useState(() => createStockStore())
  return (
    <StockStoreContext.Provider value={store}>
      {children}
    </StockStoreContext.Provider>
  )
}

export const useStockStore = <T,>(
  selector: (store: StockStore) => T,
): T => {
  const stockStoreContext = useContext(StockStoreContext)
  if (!stockStoreContext) {
    throw new Error(`useStockStore must be used within StockStoreProvider`)
  }

  return useStore(stockStoreContext, selector)
}
