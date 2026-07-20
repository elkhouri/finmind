import { stockInfo } from './mockData';

export async function getStockInfo () {
  return stockInfo.data;
  // const response = await fetch('https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockInfo');
  // const { data } = await response.json();
  // return data;
}
