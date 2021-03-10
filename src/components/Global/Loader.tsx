import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  wrap: {
    minHeight: 'calc(100vh - 64px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
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
  loading: boolean;
  children: React.ReactNode;
}

const Loader: React.FC<LoaderProps> = ({ loading, children }: LoaderProps) => {
  const classes = useStyles();

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

export default Loader;
