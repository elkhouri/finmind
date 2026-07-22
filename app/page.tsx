import Container from '@mui/material/Container';
import StockBox from '../components/StockBox';
import ChartBox from '../components/ChartBox';
import TableBox from '../components/TableBox';
import TableDisclaimer from '@/components/TableDisclaimer';
import ErrorBar from '@/components/ErrorBar';

export default function Home() {

  return (
    <Container maxWidth="md">
      <ErrorBar />
      <StockBox />
      <ChartBox />
      <TableBox />
      <TableDisclaimer />
    </Container>
  );
}
