import { useContext } from 'react';

import { SnackBarContext } from '~/providers/snackbar';

interface SnackbarContextProps {
  openSnackbar: (
    content: string,
    variant?: 'success' | 'error' | 'warning' | 'info'
  ) => void;
}

const useSnackBar = (): SnackbarContextProps => useContext(SnackBarContext);

export default useSnackBar;
