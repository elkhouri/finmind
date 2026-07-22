import {
  AppBar,
  Toolbar,
  Box,
} from '@mui/material';
import StockSelect from './StockSelect';

export default function TopBar() {
  return (
    <AppBar position="static" elevation={0} className="border-b border-b-gray-300">
      <Toolbar className="bg-white py-2" variant="dense">
        <Box sx={{ flexGrow: 1 }} />
        <StockSelect />
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
}
