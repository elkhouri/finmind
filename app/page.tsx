import Container from '@mui/material/Container';
import StockIndicator from '../components/StockIndicator';
import ChartBox from '../components/ChartBox';
import TableBox from '../components/TableBox';
import TableDisclaimer from '@/components/TableDisclaimer';

export default function Home() {
  return (
    <Container maxWidth="md">
      <StockIndicator />
      <ChartBox />
      <TableBox />
      <TableDisclaimer />
    </Container>
  );
}
