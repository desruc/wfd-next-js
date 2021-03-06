import React, { createContext, useState, useCallback } from 'react';

import Snackbar from '~/components/Global/Snackbar';

interface SnackbarContextProps {
  openSnackbar: (
    content: string,
    variant: 'success' | 'error' | 'warning' | 'info'
  ) => void;
}

interface SnackbarState {
  open: boolean;
  variant: 'success' | 'error' | 'warning' | 'info';
  content: string;
}

export const SnackBarContext = createContext<SnackbarContextProps>({
  openSnackbar: () => null
});

export const SnackbarProvider: React.FC = ({ children }) => {
  const [snackbarState, setSnackbarstate] = useState<SnackbarState>({
    open: false,
    variant: 'success',
    content: ''
  });

  const openSnackbar = useCallback(
    (
      content: string,
      variant: 'success' | 'error' | 'warning' | 'info' = 'success'
    ) => setSnackbarstate((s) => ({ ...s, open: true, content, variant })),
    []
  );

  const closeSnackbar = () => setSnackbarstate((s) => ({ ...s, open: false }));

  const { open, variant, content } = snackbarState;

  return (
    <SnackBarContext.Provider value={{ openSnackbar }}>
      {children}
      <Snackbar
        open={open}
        handleClose={closeSnackbar}
        variant={variant}
        content={content}
      />
    </SnackBarContext.Provider>
  );
};

export default SnackbarProvider;
