"use client"

import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import StockIndicator from '../components/StockIndicator';
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
      <StockIndicator />
      <ChartBox />
      <TableBox />
      <TableDisclaimer />
    </Container>
  );
}
