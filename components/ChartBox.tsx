'use client';

import Button from '@mui/material/Button';
import StockChart from './StockChart';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Skeleton from '@mui/material/Skeleton';
import { useStockStore } from '../stores/stock';
import BaseBox from './BaseBox';

export default function ChartBox() {
  const yearPeriod = useStockStore((state) => state.yearPeriod);
  const setYearPeriod = useStockStore((state) => state.setYearPeriod);
  const currentRevenue = useStockStore((state) => state.currentRevenue);
  const isLoading = useStockStore((state) => state.isLoading);

  return (
    <BaseBox className='mt-1.5'>
      <div className='mb-3 flex justify-between items-center'>
        <Button
          variant='contained'
          disableElevation
          className='pointer-events-none'
        >
          每月營收
        </Button>
        <Select
          size='small'
          value={yearPeriod}
          onChange={(e: SelectChangeEvent<number>) =>
            setYearPeriod(e.target.value as number)
          }
        >
          <MenuItem value={3}>近 3 年</MenuItem>
          <MenuItem value={5}>近 5 年</MenuItem>
          <MenuItem value={8}>近 8 年</MenuItem>
        </Select>
      </div>
      {isLoading ? (
        <Skeleton variant='rounded' width='100%' height={400} />
      ) : currentRevenue?.length > 0 ? (
        <StockChart />
      ) : (
        <div className='text-center text-gray-600'>無資料</div>
      )}
    </BaseBox>
  );
}
