import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

interface UseStyleProps {
  fullPage: boolean;
}

const useStyles = makeStyles((theme) => ({
  wrap: ({ fullPage }: UseStyleProps) => ({
    minHeight: fullPage ? 'calc(100vh - 64px)' : 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }),
  box: {
    backgroundColor: '#d8eefe',
    height: 60,
    width: 60,
    padding: 10,
    boxShadow: theme.shadows[8],
    borderRadius: theme.shape.borderRadius
  }
}));

interface LoaderProps {
  fullPage?: boolean;
  loading: boolean;
  children: React.ReactNode;
}

const Loader: React.FC<LoaderProps> = ({
  fullPage,
  loading,
  children
}: LoaderProps) => {
  const classes = useStyles({ fullPage });

  return loading ? (
    <div className={classes.wrap}>
      <div className={classes.box}>
        <CircularProgress color="secondary" />
      </div>
    </div>
  ) : (
    <>{children}</>
  );
};

Loader.defaultProps = {
  fullPage: false
};

export default Loader;
