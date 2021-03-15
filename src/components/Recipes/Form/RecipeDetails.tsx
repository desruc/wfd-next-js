import React from 'react';

import { Recipe } from 'wfd';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import TextInput from '~/components/Inputs/TextInput';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4)
  }
}));

interface RecipeDetailsProps {
  inputRef: React.Ref<HTMLInputElement>;
  recipe?: Recipe;
  errors?: Record<string, string[]>;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({
  inputRef,
  recipe,
  errors
}: RecipeDetailsProps) => {
  const classes = useStyles();

  return (
    <Paper key={recipe?.title} className={classes.paper}>
      <TextInput
        inputRef={inputRef}
        id="title-input"
        label="Title"
        name="title"
        required
        defaultValue={recipe?.title}
        errors={errors}
      />
      <TextInput
        inputRef={inputRef}
        id="description-input"
        label="Description"
        name="description"
        required
        defaultValue={recipe?.description}
        errors={errors}
      />
      <TextInput
        inputRef={inputRef}
        id="prep-time-input"
        label="Time to prep"
        name="prepTime"
        type="number"
        defaultValue={recipe?.prepTime}
        errors={errors}
      />
      <TextInput
        inputRef={inputRef}
        id="cooking-time-input"
        label="Time to cook"
        name="cookingTime"
        type="number"
        required
        defaultValue={recipe?.cookingTime}
        errors={errors}
      />
      <TextInput
        inputRef={inputRef}
        id="original-input"
        label="Link to original"
        name="originalUrl"
        placeholder="Did you find this recipe on another site? Give credit where credit is due! Add the link here"
        errors={errors}
        defaultValue={recipe?.originalUrl}
      />
    </Paper>
  );
};

RecipeDetails.defaultProps = {
  recipe: null,
  errors: null
};

export default RecipeDetails;
