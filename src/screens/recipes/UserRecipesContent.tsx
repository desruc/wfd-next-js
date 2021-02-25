import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import PageHeader from '~/components/Global/PageHeader';
import RecipeCardList from '~/components/Recipes/RecipeCardList';

const UserRecipesContent: React.FC = () => {
  const router = useRouter();

  const { data } = useSWR(`/api/recipes/u/${router.query.userId}`);

  const onRecipeClick = ({ id: recipeId }) =>
    router.push(`/recipes/${recipeId}`);

  return (
    <div>
      <PageHeader title="Recipes" />
      <RecipeCardList recipes={data?.data} onRecipeClick={onRecipeClick} />
    </div>
  );
};

export default UserRecipesContent;
