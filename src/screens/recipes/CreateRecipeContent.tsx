import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import axios from 'axios';

import PageHeader from '~/components/Global/PageHeader';
import RecipeForm from '~/components/Recipes/RecipeForm';
import Snackbar from '~/components/Global/Snackbar';

interface RecipePayload {
  title: string;
  description: string;
  time: string;
  public: boolean;
}

const CreateRecipeContent: React.FC = () => {
  const { user } = useUser();

  const [snackbarProps, setSnackbarProps] = useState({
    open: false,
    variant: 'success',
    content: ''
  });

  const closeSnackbar = () => setSnackbarProps((s) => ({ ...s, open: false }));

  const onSubmit = (data: RecipePayload): void => {
    axios
      .post('/api/recipes/create', { ...data, author: user?.sub })
      .then(() => {
        setSnackbarProps((p) => ({
          ...p,
          open: true,
          content: 'Recipe created successfully'
        }));
      });
  };

  const [imageSrc, setImageSrc] = useState('');

  const onImageChange = (src: string) => setImageSrc(src);

  const { open: snackbarOpen, variant, content } = snackbarProps;

  return (
    <div>
      <PageHeader title="Create recipe" />
      <RecipeForm
        onSubmit={onSubmit}
        imageSrc={imageSrc}
        onImageSave={onImageChange}
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
