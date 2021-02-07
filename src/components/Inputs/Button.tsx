import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import MuiButton, {
  ButtonProps as MuiButtonProps
} from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  root: {
    '& .MuiButton-label': {
      display: 'flex'
    }
  }
});

interface ButtonProps extends MuiButtonProps {
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  loading,
  ...rest
}: ButtonProps) => {
  const classes = useStyles();

  return (
    <MuiButton
      color="default"
      classes={{ root: classes.root }}
      disabled={disabled}
      /* eslint-disable-next-line */
      {...rest}
    >
      {loading ? <CircularProgress color="secondary" size={24} /> : children}
    </MuiButton>
  );
};

Button.defaultProps = {
  children: null,
  disabled: false,
  loading: false
};

export default Button;
