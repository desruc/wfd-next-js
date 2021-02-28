import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import { Recipe } from 'wfd';

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
  const {
    query: { recipeId }
  } = useRouter();

  const [snackbarProps, setSnackbarProps] = useState({
    open: false,
    variant: 'success',
    content: ''
  });

  const [apiErrors, setApiErrors] = useState(null);

  const closeSnackbar = () => setSnackbarProps((s) => ({ ...s, open: false }));

  const onSubmit = (data: RecipePayload): void => {
    axios
      .put(`/api/recipes/${recipeId}/edit`, data)
      .then(() => {
        setSnackbarProps((p) => ({
          ...p,
          open: true,
          content: 'Recipe updated successfully'
        }));
      })
      .catch((err) => {
        setApiErrors(err.response.data.errors);
      });
  };

  const [imageSrc, setImageSrc] = useState('');

  const onImageChange = (src: string) => setImageSrc(src);

  const { open: snackbarOpen, variant, content } = snackbarProps;

  return (
    <div>
      <PageHeader title="Edit recipe" />
      <RecipeForm
        recipe={recipe}
        onSubmit={onSubmit}
        imageSrc={imageSrc}
        onImageSave={onImageChange}
        apiErrors={apiErrors}
      />
      <Snackbar
        open={snackbarOpen}
        variant={variant}
        content={content}
        handleClose={closeSnackbar}
      />
    </div>
  );
};

export default CreateRecipeContent;
