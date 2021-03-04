import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import { Recipe } from 'wfd';

import Container from '@material-ui/core/Container';

import PageHeader from '~/components/Global/PageHeader';
import RecipeForm from '~/components/Recipes/RecipeForm';
import Snackbar from '~/components/Global/Snackbar';

interface RecipePayload {
  title: string;
  description: string;
  time: string;
  public: boolean;
}

interface EditRecipeContent {
  recipe: Recipe;
}

const CreateRecipeContent: React.FC<EditRecipeContent> = ({
  recipe
}: EditRecipeContent) => {
  const router = useRouter();

  const {
    query: { recipeId }
  } = router;

  const [snackbarProps, setSnackbarProps] = useState({
    open: false,
    variant: 'success',
    content: ''
  });

  const [apiErrors, setApiErrors] = useState(null);

  const closeSnackbar = () => setSnackbarProps((s) => ({ ...s, open: false }));

  const [imageSrc, setImageSrc] = useState('');

  const onImageChange = (src: string) => setImageSrc(src);

  const onSubmit = (data: RecipePayload): void => {
    axios
      .put(`/api/recipes/${recipeId}/edit`, {
        ...data,
        image: imageSrc || recipe.image
      })
      .then(() => {
        router.push(`/recipes/${recipeId}`);
      })
      .catch((err) => {
        setApiErrors(err.response.data.errors);

        setSnackbarProps({
          variant: 'error',
          open: true,
          content: 'Recipe updated successfully'
        });
      });
  };

  const { open: snackbarOpen, variant, content } = snackbarProps;

  return (
    <main>
      <Container maxWidth="xl">
        <PageHeader title="Edit recipe" />
        <RecipeForm
          recipe={recipe}
          onSubmit={onSubmit}
          imageSrc={imageSrc || recipe?.image}
          onImageSave={onImageChange}
          apiErrors={apiErrors}
        />
        <Snackbar
          open={snackbarOpen}
          variant={variant}
          content={content}
          handleClose={closeSnackbar}
        />
      </Container>
    </main>
  );
};

export default CreateRecipeContent;
