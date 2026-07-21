'use client';

import { useStockStore } from '../stores/stock';

export default function StockIndicator() {
  const currentStock = useStockStore((state) => state.currentStock);

  return (
    <div className="mt-4 py-3 px-5 bg-gray-50 border border-gray-300 rounded-sm">
      <span className="text-lg font-semibold text-gray-600 leading-0">
        {currentStock?.stock_id ? `${currentStock.stock_name} (${currentStock.stock_id})` : '請選擇股票'}
      </span>
    </div>
  );
}
