"use client"

import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import StockBox from '../components/StockBox';
import ChartBox from '../components/ChartBox';
import TableBox from '../components/TableBox';
import TableDisclaimer from '@/components/TableDisclaimer';
import { useStockStore } from '../stores/stock';

export default function Home() {
  const error = useStockStore((state) => state.error);
  const setError = useStockStore((state) => state.setError);

  return (
    <Container maxWidth="md">
      { error && <Alert className="mt-4" severity="error" onClose={() => {setError('')}}>{ error }</Alert> }
      <StockBox />
      <ChartBox />
      <TableBox />
      <TableDisclaimer />
    </Container>
  );
}
