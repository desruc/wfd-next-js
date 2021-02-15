import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useUser } from '@auth0/nextjs-auth0';

import { State } from 'wfd';

import PageHeader from '~/components/Global/PageHeader';
import Button from '~/components/Inputs/Button';
import RecipeCardList from '~/components/Recipes/RecipeCardList';

import { selectPublicRecipes } from '~/state/recipes/selectors';

const IndexContent: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();

  const onCreateRecipe = () => router.push('/create-recipe');

  const recipes = useSelector((state: State) => selectPublicRecipes(state));

  const headerAction = (
    <>
      {user && (
        <Button variant="contained" color="secondary" onClick={onCreateRecipe}>
          Create recipe
        </Button>
      )}
    </>
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
