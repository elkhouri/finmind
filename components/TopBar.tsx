'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  AppBar,
  Toolbar,
  TextField,
  Box,
  Autocomplete
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getStockInfo } from '../lib/data';
import { useStockStore } from '../stores/stock';

export default function TopBar() {
  const [stockInfo, setStockInfo] = useState<any[]>([]);
  const { setCurrentStock } = useStockStore()

  useEffect(() => {
    const fetchStockInfo = async () => {
      const data = await getStockInfo();
      setStockInfo(data);
    };

    fetchStockInfo();
  }, []);

  const stockOptions = useMemo(() => {
    return stockInfo
      .filter((value, index, self) => {
        return (
          self.findIndex(item => item.stock_id === value.stock_id) === index
        );
      })
  }, [stockInfo]);

  return (
    <AppBar position="static" >
      <Toolbar className="bg-white" >
        <Box sx={{ flexGrow: 1 }} />
        <Autocomplete
          disablePortal
          options={stockOptions}
          getOptionKey={(option) => option.stock_id + option.industry_category + option.type}
          getOptionLabel={(option) => `${option.stock_name} (${option.stock_id})`}
          sx={{ width: 400 }}
          size="small"
          popupIcon={<SearchIcon />}
          renderInput={(params) => <TextField {...params} placeholder="輸入台／美股代號，查看公司價值" />}
          onChange={(event, newValue) => {
            setCurrentStock(newValue);
          }}
        />
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
}
