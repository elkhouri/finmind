'use client';

import Button from '@mui/material/Button';
import StockChart from './StockChart';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useStockStore } from '../stores/stock';

export default function ChartBox() {
  const { yearPeriod, setYearPeriod, currentRevenue } = useStockStore()

  return (
    <div className="mt-1.5 border border-gray-300 bg-white rounded-sm py-4 px-5">
      <div className="mb-3 flex justify-between items-center">
        <Button variant="contained" disableElevation className="pointer-events-none">每月營收</Button>
        <Select
          size="small"
          value={yearPeriod}
          onChange={(e: SelectChangeEvent<number>) => setYearPeriod(e.target.value as number)}
        >
          <MenuItem value={3}>近 3 年</MenuItem>
          <MenuItem value={5}>近 5 年</MenuItem>
          <MenuItem value={8}>近 8 年</MenuItem>
        </Select>
      </div>

      {
        currentRevenue?.length > 0 ?
        <StockChart /> : 
        <div className="text-center text-gray-600">無資料</div>
      }
    </div>
  );
}
