import Container from '@mui/material/Container';
import StockBox from '../components/StockBox';
import ChartBox from '../components/ChartBox';
import TableBox from '../components/TableBox';
import TableDisclaimer from '@/components/TableDisclaimer';
import ErrorAlert from '@/components/ErrorAlert';

export default function Home() {

  return (
    <Container maxWidth="md">
      <ErrorAlert />
      <StockBox />
      <ChartBox />
      <TableBox />
      <TableDisclaimer />
    </Container>
  );
}
