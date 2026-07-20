'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  TextField,
  InputAdornment,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function TopBar() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <AppBar position="static">
      <Toolbar className="bg-white">
        <Box sx={{ flexGrow: 1 }} />
        <TextField
          className="font-semibold"
          placeholder="輸入台／美股代號，查看公司價值"
          size="small"
          variant="outlined"
          value={searchValue}
          onChange={handleSearchChange}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }
          }}
          sx={{
            width: 400,
            backgroundColor: '#FAFAFA',
            color: '#434343',
            borderRadius: 3,
            '& .MuiOutlinedInput-root': {
              color: 'inherit',
            },
          }}
        />
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
}
