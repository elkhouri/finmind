'use client';

import { useStockStore } from '@/providers/stockProvider';
import BaseBox from './BaseBox';

export default function StockIndicator() {
  const currentStock = useStockStore((state) => state.currentStock);

  return (
    <BaseBox className='mt-4 bg-gray-50 py-3'>
      <span className='text-lg font-semibold text-gray-600 leading-0'>
        {currentStock?.stock_id
          ? `${currentStock.stock_name} (${currentStock.stock_id})`
          : '請選擇股票'}
      </span>
    </BaseBox>
  );
}
