'use client';

import { TextField, Autocomplete } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { useState, useEffect, useMemo } from 'react';
import { getStockInfo, getStockRevenue } from '../lib/data';
import type { Stock } from '@/stores/stockStore';
import { useStockStore } from '@/providers/stockProvider';

export default function StockSelect() {
  const [stockInfo, setStockInfo] = useState<Stock[]>([]);
  const [stockInfoLoading, setStockInfoLoading] = useState(false);
  const setCurrentStock = useStockStore((state) => state.setCurrentStock);
  const currentStock = useStockStore((state) => state.currentStock);
  const setCurrentRevenue = useStockStore((state) => state.setCurrentRevenue);
  const yearPeriod = useStockStore((state) => state.yearPeriod);
  const setIsLoading = useStockStore((state) => state.setIsLoading);
  const setError = useStockStore((state) => state.setError);

  // fetch stock info once since it doesn't change much
  useEffect(() => {
    const fetchStockInfo = async () => {
      setError('');
      try {
        setStockInfoLoading(true);
        const data = await getStockInfo();
        setStockInfo(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An error occurred');
        setStockInfo([]);
      }
      setStockInfoLoading(false);
    };

    fetchStockInfo();
  }, [setError]);

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
          setError(err instanceof Error ? err.message : 'An error occurred');
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
  }, [currentStock, setCurrentRevenue, setError, setIsLoading, yearPeriod]);

  // stock options that filters uniques by stock id since there's duplicates across industries etc.
  const stockOptions = useMemo(() => {
    return stockInfo.filter((value, index, self) => {
      return (
        self.findIndex((item) => item.stock_id === value.stock_id) === index
      );
    });
  }, [stockInfo]);

  return (
    <Autocomplete
      className="w-100"
      disablePortal
      disableClearable
      options={stockOptions}
      getOptionKey={(option) =>
        option.stock_id + option.industry_category + option.type
      }
      getOptionLabel={(option) => `${option.stock_name} (${option.stock_id})`}
      size='small'
      popupIcon={<SearchIcon />}
      renderInput={(params) => (
        <TextField {...params} placeholder='輸入台／美股代號，查看公司價值' />
      )}
      onChange={(event, newValue) => {
        setCurrentStock(newValue);
        setCurrentRevenue([]);
      }}
      loading={stockInfoLoading}
      loadingText={
        <Stack>
          {Array.from({ length: 5 }, (_, i) => (
            <Skeleton key={i} height={40} />
          ))}
        </Stack>
      }
    />
  );
}
