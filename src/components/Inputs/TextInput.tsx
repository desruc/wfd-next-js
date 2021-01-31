import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

import CheckRoundedIcon from '@material-ui/icons/CheckRounded';

const useStyles = makeStyles((theme) => ({
  formControlRoot: {
    minHeight: 78
  },
  inputRoot: {
    alignItems: 'flex-start'
  },
  inputFocused: {
    color: `${theme.palette.text.secondary} !important`
  },
  successIcon: {
    color: theme.palette.success.main
  }
}));

interface TextInputProps {
  inputRef?: React.Ref<HTMLInputElement>;
  id: string;
  name?: string;
  label?: string;
  errors?: {
    [key: string]: string[];
  };
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  helperText?: string;
  showSuccess?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  inputRef,
  id,
  name,
  label,
  errors,
  startAdornment,
  endAdornment,
  helperText,
  showSuccess,
  ...rest
}: TextInputProps) => {
  const classes = useStyles();

  const hasError = errors && Object.keys(errors).some((key) => key === name);
  const errorMessage = (hasError && errors[name][0]) || '';

  const successAdornment = <CheckRoundedIcon className={classes.successIcon} />;

  return (
    <FormControl fullWidth classes={{ root: classes.formControlRoot }}>
      {label && (
        <InputLabel
          shrink
          htmlFor={id}
          error={hasError}
          classes={{
            focused: classes.inputFocused
          }}
        >
          {label}
        </InputLabel>
      )}
      <Input
        id={id}
        name={name}
        inputRef={inputRef}
        error={hasError}
        startAdornment={startAdornment}
        fullWidth
        classes={{
          root: classes.inputRoot
        }}
        endAdornment={
          showSuccess && !hasError ? successAdornment : endAdornment
        }
        /* eslint-disable-next-line */
        {...rest}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {hasError && (
        <FormHelperText error={hasError}>{errorMessage}</FormHelperText>
      )}
    </FormControl>
  );
};

TextInput.defaultProps = {
  label: '',
  inputRef: null,
  name: '',
  errors: null,
  helperText: '',
  startAdornment: null,
  endAdornment: null,
  showSuccess: false
};

export default TextInput;
