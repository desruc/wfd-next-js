import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import RecipeHero from '~/components/Recipes/RecipeHero';
import RecipeMeta from '~/components/Recipes/RecipeMeta';

const ViewRecipeContent: React.FC = () => {
  const {
    query: { recipeId }
  } = useRouter();

  const { data } = useSWR(`/api/recipes/${recipeId}`);

  const recipe = data?.data;

  return (
    <div>
      <RecipeHero
        image={recipe?.image}
        title={recipe?.title}
        description={recipe?.description}
      />
      <RecipeMeta />
    </div>
  );
};

export default ViewRecipeContent;
