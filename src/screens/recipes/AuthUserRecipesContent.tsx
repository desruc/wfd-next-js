import React from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import useSWR from 'swr';

import PageHeader from '~/components/Global/PageHeader';
import Button from '~/components/Inputs/Button';
import RecipeCardList from '~/components/Recipes/RecipeCardList';

const IndexContent: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();

  const { data } = useSWR('/api/recipes/me');

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
      <PageHeader title="Your recipes" headerAction={headerAction} />
      <RecipeCardList recipes={data?.data} onRecipeClick={onRecipeClick} />
    </div>
  );
};

export default IndexContent;
