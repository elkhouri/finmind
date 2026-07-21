'use client';

import Button from '@mui/material/Button';
import { useRef, useLayoutEffect } from 'react';
import { useDisplayStock, useDisplayYearlyIncrease } from '../stores/stock';

export default function TableBox() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stockData = useDisplayStock();
  const yearlyIncrease = useDisplayYearlyIncrease();

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollLeft = container.scrollWidth;
    }
  }, [stockData]);
  return (
    <div className="mt-1.5 border border-gray-300 bg-white rounded pt-4 px-5 pb-5 text-sm text-gray-600">
      <Button variant="contained" disableElevation className="mb-4 pointer-events-none">詳細數據</Button>
      <div className="overflow-x-auto" ref={containerRef} >
        <table>
          <tbody>
            <tr>
              <td className="sticky whitespace-nowrap py-3.5 px-5 font-semibold">年度月份</td>
              {stockData.map((stock) => (
                <td key={stock.date} className="whitespace-nowrap py-3.5 px-5 font-semibold text-right">
                  {new Date(stock.date).getFullYear().toString() + (new Date(stock.date).getMonth() + 1).toString().padStart(2, '0')}
                </td>
              ))}
            </tr>
            <tr>
              <td className="sticky whitespace-nowrap py-3.5 px-5 font-semibold">每月營收</td>
              {stockData.map((stock) => (
                <td key={stock.date} className="whitespace-nowrap py-3.5 px-5 text-right">
                  { stock.revenue.toLocaleString() }
                </td>
              ))}
            </tr>
            <tr>
              <td className="sticky whitespace-nowrap py-3.5 px-5 font-semibold">單月營收年增率 (%)</td>
              {yearlyIncrease.map((increase) => (
                <td key={increase.date} className="whitespace-nowrap py-3.5 px-5 text-right">
                  { !increase.increase || increase?.increase === Infinity ? 'N/A' : increase?.increase?.toFixed(2)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
