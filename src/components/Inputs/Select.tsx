import React from 'react';

import { Controller, Control } from 'react-hook-form';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import MuiSelect, {
  SelectProps as MuiSelectProps
} from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControlRoot: {
    minHeight: 78
  },
  labelRoot: {
    transform: 'none',
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.common.white
  },
  labelFocused: {
    color: `${theme.palette.common.white} !important`
  },
  select: {
    color: theme.palette.common.white
  },
  icon: {
    color: theme.palette.common.white
  },
  paper: {
    backgroundColor: theme.palette.common.white
  }
}));

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectProps extends MuiSelectProps {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  defaultValue: string | number;
  onChange?: () => void;
  options: SelectOption[];
  control: Control<Record<string, any>>; // eslint-disable-line;
}

const Select: React.FC<SelectProps> = ({
  id,
  name,
  label,
  required,
  defaultValue,
  options,
  control,
  variant,
  ...rest
}: SelectProps) => {
  const classes = useStyles({ variant });

  const SelectJsx = (
    <MuiSelect
      id={id}
      required={required}
      classes={{
        select: classes.select,
        icon: classes.icon
      }}
      MenuProps={{
        classes: {
          paper: classes.paper
        }
      }}
      /* eslint-disable-next-line */
      {...rest}
    >
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </MuiSelect>
  );

  return (
    <FormControl fullWidth classes={{ root: classes.formControlRoot }}>
      {label && (
        <InputLabel
          htmlFor={id}
          classes={{ root: classes.labelRoot, focused: classes.labelFocused }}
        >
          {label}
        </InputLabel>
      )}
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        as={SelectJsx}
      />
    </FormControl>
  );
};

Select.defaultProps = {
  required: false,
  onChange: null
};

export default Select;
