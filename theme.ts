'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '.MuiAutocomplete-popupIndicatorOpen': {
            transform: 'none',
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 765,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
