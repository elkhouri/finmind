import Container from '@mui/material/Container';
import StockIndicator from '../components/StockIndicator';
import ChartBox from '../components/ChartBox';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <StockIndicator />
      <ChartBox />
    </Container>
  );
}
