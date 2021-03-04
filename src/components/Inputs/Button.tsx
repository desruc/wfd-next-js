import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import MuiButton, {
  ButtonProps as MuiButtonProps
} from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

interface UseStyleProps {
  color: string;
}

const useStyles = makeStyles((theme) => ({
  root: ({ color }: UseStyleProps) => ({
    color:
      color !== 'primary' && color !== 'secondary'
        ? 'inherit'
        : theme.palette.common.white,
    '& .MuiButton-label': {
      display: 'flex',
      fontWeight: 600
    }
  })
}));

interface ButtonProps extends MuiButtonProps {
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'inherit' | 'primary' | 'secondary' | 'default';
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  loading,
  variant,
  color,
  ...rest
}: ButtonProps) => {
  const classes = useStyles({ color });

  return (
    <MuiButton
      classes={{ root: classes.root }}
      disabled={disabled}
      variant={variant}
      color={color}
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
  loading: false,
  variant: 'contained',
  color: 'primary'
};

export default Button;
