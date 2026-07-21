'use client';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import StockTable from './StockTable';
import { useDisplayStock, useStockStore } from '../stores/stock';

export default function TableBox() {
  const stockData = useDisplayStock();
  const isLoading = useStockStore((state) => state.isLoading);

  function TableDisplay () {
    if (isLoading) {
      return (
        <div className="flex justify-center">
          <CircularProgress aria-label="Loading…" />
        </div>
      )
    } else if (stockData?.length > 0) {
      return <StockTable /> 
    } else {
      return <div className="text-center text-base">無資料</div>
    }
  }

  return (
    <div className="mt-1.5 border border-gray-300 bg-white rounded pt-4 px-5 pb-5 text-sm text-gray-600">
      <Button variant="contained" disableElevation className="mb-4 pointer-events-none">詳細數據</Button>
      <TableDisplay />
    </div>
  )
}
