import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useUser } from '@auth0/nextjs-auth0';

import PageHeader from '~/components/Global/PageHeader';
import RecipeForm from '~/components/Recipes/RecipeForm';

import { createRecipe } from '~/state/recipes/actions';

const CreateRecipeContent: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useUser();

  const onSubmit = (data): void => {
    dispatch(createRecipe({ ...data, author: user?.sub }));
  };

  const [imageSrc, setImageSrc] = useState('');
  const onImageChange = (src: string) => setImageSrc(src);

  return (
    <div>
      <PageHeader title="Create recipe" />
      <RecipeForm
        onSubmit={onSubmit}
        imageSrc={imageSrc}
        onImageSave={onImageChange}
      />
    </div>
  );
};

export default CreateRecipeContent;
