import React, { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import axios from 'axios';

import { Recipe } from 'wfd';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import PageHeader from '~/components/Global/PageHeader';
import RecipeIngredients from '~/components/Recipes/Form/RecipeIngredients';
import RecipeDetails from '~/components/Recipes/Form/RecipeDetails';
import RecipeTags from '~/components/Recipes/Form/RecipeTags';
import RecipeInstructions from '~/components/Recipes/Form/RecipeInstructions';

import { useValidatedForm } from '~/validation';
import { createRecipe } from '~/validation/recipes';
import ImageInput from '~/components/Inputs/ImageInput';

import useSnackbar from '~/hooks/useSnackbar';

interface RecipePayload {
  title: string;
  description: string;
  time: string;
  public: boolean;
}

const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: theme.spacing(4)
  }
}));

interface CreateOrEditRecipeContent {
  recipe?: Recipe;
}

const CreateOrEditRecipeContent: React.FC<CreateOrEditRecipeContent> = ({
  recipe
}: CreateOrEditRecipeContent) => {
  const router = useRouter();

  const { openSnackbar } = useSnackbar();

  const classes = useStyles();

  const { user } = useUser();

  const { register, handleSubmit, control, errors } = useValidatedForm(
    createRecipe
  );

  const [saving, setSaving] = useState(false);

  const [imageSrc, setImageSrc] = useState(
    recipe ? recipe?.image : '/images/recipe-placeholder.png'
  );

  const onImageChange = (src: string) => setImageSrc(src);

  const [ingredients, setIngredients] = useState(
    recipe ? recipe.ingredients : [{ qty: '', name: '' }]
  );

  const addIngredient = () =>
    setIngredients((i) => [...i, { qty: '', name: '' }]);

  const removeIngredient = (idx: number) =>
    setIngredients(ingredients.filter((e, i) => i !== idx));

  const onIngredientChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    idx: number
  ) =>
    setIngredients(
      ingredients.map((element, i) => {
        if (i === idx)
          return { ...element, [e.currentTarget.name]: e.currentTarget.value };
        return element;
      })
    );

  const [tags, setTags] = useState([]);

  const addTag = (newTag: string) => setTags((t) => [...t, newTag]);

  const removeTag = (oldTag: string) =>
    setTags((t) => t.filter((i) => i !== oldTag));

  useEffect(() => {
    if (recipe) {
      setIngredients(recipe.ingredients);
      setImageSrc(recipe.image);
      setTags(recipe.tags);
    }
  }, [recipe]);

  const onSubmit = handleSubmit((data: RecipePayload): void => {
    setSaving(true);

    const method = recipe ? 'put' : 'post';

    const url = recipe
      ? `/api/recipes/${recipe.id}/edit`
      : '/api/recipes/create';

    axios[method](url, {
      ...data,
      image: imageSrc,
      ingredients: ingredients.filter(Boolean),
      author: user?.sub,
      tags
    })
      .then(({ data: { data: newRecipe } }) => {
        const snackbarContent = `Recipe ${
          recipe ? 'updated' : 'created'
        } successfully`;

        openSnackbar(snackbarContent);

        router.push(`/recipes/${newRecipe.id}`);
      })
      .catch((err) => {
        setSaving(false);

        openSnackbar(
          err?.response?.data?.message || 'Something went wrong',
          'error'
        );
      });
  });

  const computedImage = imageSrc || recipe?.image;

  const computedTitle = `${recipe ? 'Edit' : 'Create'} recipe`;

  return (
    <main>
      <Container maxWidth="xl">
        <PageHeader title={computedTitle} />
        <ImageInput src={computedImage} onSave={onImageChange} />
        <Grid container spacing={2} className={classes.grid}>
          <Grid item xs={12} lg={6}>
            <RecipeDetails
              inputRef={register}
              recipe={recipe}
              errors={errors}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <RecipeIngredients
              showLabel
              ingredients={ingredients}
              onAdd={addIngredient}
              onChange={onIngredientChange}
              onRemove={removeIngredient}
            />
          </Grid>
          <Grid item xs={12}>
            <RecipeTags tags={tags} onRemove={removeTag} onSubmit={addTag} />
          </Grid>
          <Grid item xs={12}>
            <RecipeInstructions
              inputRef={register}
              onSubmit={onSubmit}
              checkboxControl={control}
              recipe={recipe}
              errors={errors}
              saving={saving}
            />
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

CreateOrEditRecipeContent.defaultProps = {
  recipe: null
};

export default CreateOrEditRecipeContent;
