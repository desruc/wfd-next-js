import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input, { InputProps } from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

import CheckRoundedIcon from '@material-ui/icons/CheckRounded';

interface UseStyleProps {
  variant: string;
}

const useStyles = makeStyles((theme) => ({
  formControlRoot: {
    minHeight: 78
  },
  labelRoot: ({ variant }: UseStyleProps) => ({
    transform: 'none',
    fontSize: 14,
    fontWeight: 600,
    color: `${
      variant === 'blue'
        ? theme.palette.common.white
        : theme.palette.text.primary
    } !important`
  }),
  required: {
    color: theme.palette.secondary.dark
  },
  inputRoot: ({ variant }: UseStyleProps) => ({
    color: `${
      variant === 'blue' ? '#d8eefe' : theme.palette.text.primary
    } !important`,
    alignItems: 'flex-start'
  }),
  inputFocused: ({ variant }: UseStyleProps) => ({
    color: `${
      variant === 'blue'
        ? theme.palette.common.white
        : theme.palette.text.primary
    } !important`
  }),
  successIcon: {
    color: theme.palette.success.light
  },
  helperTextRoot: ({ variant }: UseStyleProps) => ({
    color: `${
      variant === 'blue'
        ? theme.palette.common.white
        : theme.palette.text.primary
    } !important`
  })
}));

interface TextInputProps extends InputProps {
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
  variant?: 'blue' | 'white';
  required?: boolean;
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
  variant,
  required,
  ...rest
}: TextInputProps) => {
  const classes = useStyles({ variant });

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
            root: classes.labelRoot,
            focused: classes.inputFocused
          }}
        >
          {label}
          {required && <span className={classes.required}>{` * `}</span>}
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
      {helperText && (
        <FormHelperText classes={{ root: classes.helperTextRoot }}>
          {helperText}
        </FormHelperText>
      )}
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
  showSuccess: false,
  variant: 'blue',
  required: false
};

export default TextInput;
