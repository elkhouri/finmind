import type { Stock, StockRevenue } from '../stores/stock';

export async function getStockInfo (): Promise<Stock[]> {
  const response = await fetch('https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockInfo');
  const { data } = await response.json();
  return data;
}

export async function getStockRevenue (stockId: string, yearPeriod: number): Promise<StockRevenue[]> {
  const startDate = `${new Date().getFullYear() - yearPeriod - 1}-${new Date().getMonth() + 1}-01`;
  const response = await fetch(`https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockMonthRevenue&data_id=${stockId}&start_date=${startDate}`);
  const { data } = await response.json();
  return data;
}
