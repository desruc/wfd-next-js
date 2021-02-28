import React from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';

import { Recipe } from 'wfd';

import PageHeader from '~/components/Global/PageHeader';
import Button from '~/components/Inputs/Button';
import RecipeCardList from '~/components/Recipes/RecipeCardList';

interface IndexProps {
  recipes: Recipe[];
}

const IndexContent: React.FC<IndexProps> = ({ recipes }: IndexProps) => {
  const router = useRouter();
  const { user } = useUser();

  const onCreateRecipe = () => router.push('/recipes/create');

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
    router.push(`/recipes/${recipeId}`);

  return (
    <div>
      <PageHeader title="Recipes" headerAction={headerAction} />
      <RecipeCardList recipes={recipes} onRecipeClick={onRecipeClick} />
    </div>
  );
};

export default IndexContent;
