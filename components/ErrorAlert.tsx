'use client';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useStockStore } from '../stores/stock';

export default function ErrorBar() {
  const error = useStockStore((state) => state.error);
  const setError = useStockStore((state) => state.setError);

  function handleClose() {
    setError('');
  }

  return (
    <Snackbar
      open={!!error}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert severity='error' onClose={handleClose}>
        {error}
      </Alert>
    </Snackbar>
  );
}
