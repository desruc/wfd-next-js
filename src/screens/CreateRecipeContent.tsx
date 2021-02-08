import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import PageHeader from '~/components/Global/PageHeader';
import RecipeForm from '~/components/Recipes/RecipeForm';

import { createRecipe } from '~/state/recipes/actions';

const CreateRecipeContent: React.FC = () => {
  const dispatch = useDispatch();

  const onSubmit = (data): void => {
    dispatch(createRecipe(data));
  };

  const [imageSrc, setImageSrc] = useState('');
  const onImageChange = (src: string) => setImageSrc(src);

  return (
    <div>
      <PageHeader title="WFD" />
      <RecipeForm
        onSubmit={onSubmit}
        imageSrc={imageSrc}
        onImageSave={onImageChange}
      />
    </div>
  );
};

export default CreateRecipeContent;
