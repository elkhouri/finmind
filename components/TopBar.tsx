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
import { getStockInfo, getStockRevenue } from '../lib/data';
import { type Stock, useStockStore } from '../stores/stock';

export default function TopBar() {
  const [stockInfo, setStockInfo] = useState<Stock[]>([]);
  const { setCurrentStock, currentStock, setCurrentRevenue, yearPeriod, isLoading, setIsLoading, error, setError } = useStockStore()

  // fetch stock info once since it doesn't change much
  useEffect(() => {
    const fetchStockInfo = async () => {
      setError('');
      try {
        const data = await getStockInfo();
        setStockInfo(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "An error occurred");
        setStockInfo([]);
      }
    };

    fetchStockInfo();
  }, []);

  // fetch stock revenue when the user selects stock or year period, with debounce
  useEffect(() => {
    if (!currentStock || !currentStock.stock_id) return;

    let isValid = true;
    setIsLoading(true);

    const debounceTimer = setTimeout(async () => {
      try {
        setError('');
        
        const data = await getStockRevenue(currentStock.stock_id, yearPeriod);
        
        if (isValid) {
          setCurrentRevenue(data);
        }
      } catch (err) {
        if (isValid) {
          setError(err instanceof Error ? err.message : "An error occurred");
          setCurrentRevenue([]);
        }
      } finally {
        if (isValid) {
          setIsLoading(false);
        }
      }
    }, 1000);

    return () => {
      clearTimeout(debounceTimer);
      isValid = false;
    };
  }, [currentStock, yearPeriod]);

  // stock options that filters uniques by stock id since there's duplicates across industries etc.
  const stockOptions = useMemo(() => {
    return stockInfo
      .filter((value, index, self) => {
        return (
          self.findIndex(item => item.stock_id === value.stock_id) === index
        );
      })
  }, [stockInfo]);

  return (
    <AppBar position="static" elevation={0} className="border-b border-b-gray-300">
      <Toolbar className="bg-white py-2" variant="dense">
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
