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
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({
  inputRef,
  recipe
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
      />
      <TextInput
        inputRef={inputRef}
        id="description-input"
        label="Description"
        name="description"
        required
        defaultValue={recipe?.description}
      />
      <TextInput
        inputRef={inputRef}
        id="prep-time-input"
        label="Time to prep"
        name="prepTime"
        type="number"
        defaultValue={recipe?.prepTime}
      />
      <TextInput
        inputRef={inputRef}
        id="cooking-time-input"
        label="Time to cook"
        name="cookingTime"
        type="number"
        required
        defaultValue={recipe?.cookingTime}
      />
      <TextInput
        inputRef={inputRef}
        id="original-input"
        label="Link to original"
        name="originalUrl"
        placeholder="Did you find this recipe on another site? Give credit where credit is due! Add the link here"
      />
    </Paper>
  );
};

RecipeDetails.defaultProps = {
  recipe: null
};

export default RecipeDetails;
