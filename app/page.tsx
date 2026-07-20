import Container from '@mui/material/Container';
import StockIndicator from '../components/StockIndicator';
import StockChart from '../components/StockChart';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <StockIndicator />
      <StockChart />
    </Container>
  );
}
