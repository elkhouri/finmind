'use client';

import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import StockTable from './StockTable';
import { useDisplayRevenue, useStockStore } from '../stores/stock';
import BaseBox from './BaseBox';

export default function TableBox() {
  const stockData = useDisplayRevenue();
  const isLoading = useStockStore((state) => state.isLoading);

  function TableDisplay () {
    if (isLoading) {
      return <Skeleton variant="rounded" width="100%" height={150} />
    } else if (stockData?.length > 0) {
      return <StockTable /> 
    } else {
      return <div className="text-center text-base">無資料</div>
    }
  }

  return (
    <BaseBox className="mt-1.5">
      <Button variant="contained" disableElevation className="mb-4 pointer-events-none">詳細數據</Button>
      <TableDisplay />
    </BaseBox>
  )
}
