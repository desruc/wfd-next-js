import React from 'react';
import { useDispatch } from 'react-redux';

import PageHeader from '~/components/Global/PageHeader';
import RecipeForm from '~/components/Recipes/RecipeForm';

import { createRecipe } from '~/state/recipes/actions';

const CreateRecipeContent: React.FC = () => {
  const dispatch = useDispatch();

  const onSubmit = (data): void => {
    dispatch(createRecipe(data));
  };

  return (
    <div>
      <PageHeader title="WFD" />
      <RecipeForm onSubmit={onSubmit} />
    </div>
  );
};

export default CreateRecipeContent;
