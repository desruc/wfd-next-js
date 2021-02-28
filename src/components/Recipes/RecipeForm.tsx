import React from 'react';

import { ApiErrors, Recipe } from 'wfd';

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
    padding: theme.spacing(4)
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
  recipe?: Recipe;
  onSubmit: (data: { [x: string]: any }) => void;
  saving?: boolean;
  apiErrors?: ApiErrors | null;
  imageSrc?: string;
  onImageSave: (x: string) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({
  recipe,
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
      <Paper key={recipe?.title} className={classes.paper}>
        <TextInput
          inputRef={register}
          id="title-input"
          label="Title"
          name="title"
          errors={computedErrors}
          defaultValue={recipe?.title}
        />
        <TextInput
          inputRef={register}
          id="description-input"
          label="Description"
          name="description"
          errors={computedErrors}
          defaultValue={recipe?.description}
        />
        <TextInput
          inputRef={register}
          id="prep-time-input"
          label="Time to prep"
          name="prepTime"
          type="number"
          errors={computedErrors}
          defaultValue={recipe?.prepTime}
        />
        <TextInput
          inputRef={register}
          id="cooking-time-input"
          label="Time to cook"
          name="cookingTime"
          type="number"
          errors={computedErrors}
          defaultValue={recipe?.cookingTime}
        />
        <div className={classes.checkboxContainer}>
          <Controller
            name="public"
            control={control}
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
  recipe: null,
  saving: false,
  apiErrors: null,
  imageSrc: '/images/recipe-placeholder.png'
};

export default RecipeForm;
