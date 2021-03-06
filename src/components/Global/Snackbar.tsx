import React from 'react';
import cn from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import MuiSnackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';

const variantIcons = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const useStyles = makeStyles((theme) => ({
  snackRoot: {
    borderRadius: theme.shape.borderRadius,
    '& #snackbar-content': {
      color: theme.palette.common.white,
      display: 'flex'
    },
    '& .MuiSvgIcon-root': {
      color: theme.palette.common.white
    }
  },
  error: {
    backgroundColor: theme.palette.error.main
  },
  success: {
    backgroundColor: theme.palette.success.main
  },
  warning: {
    backgroundColor: theme.palette.warning.main
  },
  info: {
    backgroundColor: theme.palette.info.main
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  }
}));

interface SnackbarProps {
  variant: 'success' | 'error' | 'warning' | 'info';
  content: string;
  open: boolean;
  handleClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({
  variant,
  content,
  open,
  handleClose
}: SnackbarProps) => {
  const classes = useStyles();

  const Icon = variantIcons[variant];

  const action = (
    <IconButton
      key="close"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon className={classes.icon} />
    </IconButton>
  );

  const ContentJsx = (
    <span id="snackbar-content">
      <Icon className={cn(classes.icon, classes.iconVariant)} />
      {content}
    </span>
  );

  return (
    <MuiSnackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'snackbar-content'
      }}
    >
      <SnackbarContent
        message={ContentJsx}
        action={action}
        className={cn(classes.snackRoot, classes[variant])}
      />
    </MuiSnackbar>
  );
};

export default Snackbar;
