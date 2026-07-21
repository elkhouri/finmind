'use client';

import Button from '@mui/material/Button';
import StockTable from './StockTable';
import { useDisplayStock } from '../stores/stock';

export default function TableBox() {
  const stockData = useDisplayStock();

  return (
    <div className="mt-1.5 border border-gray-300 bg-white rounded pt-4 px-5 pb-5 text-sm text-gray-600">
      <Button variant="contained" disableElevation className="mb-4 pointer-events-none">詳細數據</Button>
      {
        stockData?.length > 0 ?
        <StockTable /> : 
        <div className="text-center text-base">無資料</div>
      }
    </div>
  )
}
