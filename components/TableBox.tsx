'use client';

import Button from '@mui/material/Button';
import { useRef, useLayoutEffect } from 'react';

export default function TableBox() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollLeft = container.scrollWidth;
    }
  }, []);
  return (
    <div className="mt-4 border border-gray-300 bg-white rounded pt-4 px-5 pb-5">
      <Button variant="contained" className="mb-4">詳細數據</Button>
      <div className="overflow-x-auto" ref={containerRef} >
        <table>
          <tbody>
            <tr>
              <td className="sticky whitespace-nowrap py-3 px-5 font-semibold">年度月份</td>
              {Array.from({ length: 120 }, (_, i) => (
                <td key={i} className="whitespace-nowrap py-3 px-5 font-semibold">
                  {i + 1}
                </td>
              ))}
            </tr>
            <tr>
              <td className="sticky whitespace-nowrap py-3 px-5">每月營收</td>
              <td className="whitespace-nowrap py-3 px-5">2</td>
            </tr>
            <tr>
              <td className="sticky whitespace-nowrap py-3 px-5">單月營收年增率 (%)</td>
              <td className="whitespace-nowrap py-3 px-5">3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
