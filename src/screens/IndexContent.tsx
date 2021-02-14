import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { State } from 'wfd';

import PageHeader from '~/components/Global/PageHeader';
import Button from '~/components/Inputs/Button';
import RecipeCardList from '~/components/Recipes/RecipeCardList';

const IndexContent: React.FC = () => {
  const router = useRouter();

  const onCreateRecipe = () => router.push('/create-recipe');

  const recipes = useSelector((state: State) => state.recipes.publicRecipes);

  const headerAction = (
    <Button variant="contained" color="secondary" onClick={onCreateRecipe}>
      Create recipe
    </Button>
  );

  const onRecipeClick = ({ id: recipeId }) =>
    router.push(`/recipe/${recipeId}`);

  return (
    <div>
      <PageHeader title="Recipes" headerAction={headerAction} />
      <RecipeCardList recipes={recipes} onRecipeClick={onRecipeClick} />
    </div>
  );
};

export default IndexContent;
