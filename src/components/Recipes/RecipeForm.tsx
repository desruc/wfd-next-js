import React from 'react';

import { ApiErrors } from 'wfd';

import { Controller } from 'react-hook-form';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import { useValidatedForm } from '~/validation';
import { createRecipe } from '~/validation/recipes';

import TextInput from '~/components/Inputs/TextInput';
import Checkbox from '~/components/Inputs/Checkbox';
import Button from '~/components/Inputs/Button';
import ImageInput from '~/components/Inputs/ImageInput';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2)
  },
  checkboxContainer: {
    textAlign: 'center'
  },
  submitContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(4)
  }
}));

interface RecipeFormProps {
  onSubmit: (data: { [x: string]: any }) => void;
  saving?: boolean;
  apiErrors?: ApiErrors | null;
  imageSrc?: string;
  onImageSave: (x: string) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({
  onSubmit,
  saving,
  apiErrors,
  imageSrc,
  onImageSave
}: RecipeFormProps) => {
  const classes = useStyles();
  const { register, handleSubmit, errors, control } = useValidatedForm(
    createRecipe
  );

  const computedErrors = errors || apiErrors;

  return (
    <>
      <ImageInput src={imageSrc} onSave={onImageSave} />
      <Paper className={classes.paper}>
        <TextInput
          inputRef={register}
          id="title-input"
          label="Title"
          name="title"
          errors={computedErrors}
        />
        <TextInput
          inputRef={register}
          id="description-input"
          label="Description"
          name="description"
          errors={computedErrors}
        />
        <TextInput
          inputRef={register}
          id="time-input"
          label="Time to cook"
          name="time"
          errors={computedErrors}
        />
        <div className={classes.checkboxContainer}>
          <Controller
            name="public"
            control={control}
            defaultValue={false}
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
          <Button
            onClick={handleSubmit(onSubmit)}
            loading={saving}
            disabled={saving}
          >
            Submit
          </Button>
        </div>
      </Paper>
    </>
  );
};

RecipeForm.defaultProps = {
  saving: false,
  apiErrors: null,
  imageSrc: '/images/recipe-placeholder.png'
};

export default RecipeForm;