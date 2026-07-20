'use client';

import { useStockStore } from '../stores/stock';

export default function StockIndicator() {
  const currentStock = useStockStore((state) => state.currentStock);

  return (
    <div className="mt-4 flex items-center justify-center h-12 bg-white border border-gray-300">
      <span className="text-lg font-semibold text-gray-800">
        {currentStock?.stock_id ? `${currentStock.stock_name} (${currentStock.stock_id})` : '請選擇股票'}
      </span>
    </div>
  );
}
