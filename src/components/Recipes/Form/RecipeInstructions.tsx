import React from 'react';

import { Recipe } from 'wfd';

import { Control, Controller } from 'react-hook-form';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import TextInput from '~/components/Inputs/TextInput';
import Checkbox from '~/components/Inputs/Checkbox';
import Button from '~/components/Inputs/Button';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4)
  },
  checkboxContainer: {
    marginTop: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.common.white
  },
  submitContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
    '& .MuiButtonBase-root': {
      minWidth: 135
    }
  }
}));

interface RecipeDetailsProps {
  inputRef: React.Ref<HTMLInputElement>;
  recipe?: Recipe;
  checkboxControl: Control<Record<string, any>>; // eslint-disable-line
  onSubmit: () => void;
  errors?: Record<string, string[]>;
}

const RecipeInstructions: React.FC<RecipeDetailsProps> = ({
  inputRef,
  recipe,
  checkboxControl,
  onSubmit,
  errors
}: RecipeDetailsProps) => {
  const classes = useStyles();

  return (
    <Paper key={recipe?.title} className={classes.paper}>
      <TextInput
        inputRef={inputRef}
        id="instructions-input"
        label="Instructions"
        name="instructions"
        multiline
        rows={5}
        defaultValue={recipe?.instructions}
        errors={errors}
      />
      <div className={classes.checkboxContainer}>
        <Controller
          name="public"
          control={checkboxControl}
          defaultValue={recipe?.public || false}
          render={({ onChange, value, name, ref }) => (
            <Checkbox
              inputRef={ref}
              name={name}
              checked={value}
              onChange={(e) => onChange(e.target.checked)}
              label="Share with the world"
            />
          )}
        />
      </div>
      <div className={classes.submitContainer}>
        <Button color="secondary" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </Paper>
  );
};

RecipeInstructions.defaultProps = {
  recipe: null,
  errors: null
};

export default RecipeInstructions;
