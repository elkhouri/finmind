import { stockInfo, stockRevenue } from './mockData';

export async function getStockInfo () {
  return stockInfo.data;
  // const response = await fetch('https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockInfo');
  // const { data } = await response.json();
  // return data;
}

export async function getStockRevenue (stockId: string, startDate:string) {
  return stockRevenue.data
  // const response = await fetch(`https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockMonthRevenue&data_id=${stockId}`);
  // const { data } = await response.json();
  // return data;
}
