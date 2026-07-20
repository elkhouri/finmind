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
  }
});

export default theme;
