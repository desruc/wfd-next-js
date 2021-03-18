import React from 'react';

import { Recipe } from 'wfd';
import { Control } from 'react-hook-form';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import TextInput from '~/components/Inputs/TextInput';
import Select from '~/components/Inputs/Select';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4)
  }
}));

interface RecipeDetailsProps {
  recipe?: Recipe;
  errors?: Record<string, string[]>;
  inputRef: React.Ref<HTMLInputElement>;
  selectControl: Control<Record<string, any>>; // eslint-disable-line
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({
  inputRef,
  recipe,
  errors,
  selectControl
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
      <Select
        id="difficulty-input"
        name="difficulty"
        label="Difficulty"
        control={selectControl}
        options={[
          { label: 'Easy', value: 'easy' },
          { label: 'Moderate', value: 'moderate' },
          { label: 'Difficult', value: 'difficult' }
        ]}
        defaultValue={recipe?.difficulty || 'easy'}
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
