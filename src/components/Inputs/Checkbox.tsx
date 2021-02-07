import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiCheckbox, {
  CheckboxProps as MuiCheckboxProps
} from '@material-ui/core/Checkbox';

const useStyles = makeStyles({
  label: {
    fontSize: '0.875rem !important'
  }
});

interface CheckboxProps extends MuiCheckboxProps {
  inputRef?: React.Ref<HTMLInputElement>;
  name?: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  defaultValue?: number;
}

const Checkbox: React.FC<CheckboxProps> = ({
  inputRef,
  name,
  label,
  checked,
  onChange,
  disabled,
  defaultValue
}: CheckboxProps) => {
  const classes = useStyles();

  const controlJsx = (
    <MuiCheckbox
      name={name}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      inputRef={inputRef}
      defaultValue={defaultValue}
    />
  );

  return (
    <FormControlLabel
      control={controlJsx}
      label={label}
      classes={{ label: classes.label }}
    />
  );
};

Checkbox.defaultProps = {
  inputRef: null,
  name: '',
  label: '',
  checked: false,
  disabled: false,
  defaultValue: 0
};

export default Checkbox;
