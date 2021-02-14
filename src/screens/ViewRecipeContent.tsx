import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { State } from 'wfd';

import RecipeHero from '~/components/Recipes/RecipeHero';
import RecipeMeta from '~/components/Recipes/RecipeMeta';

const ViewRecipeContent: React.FC = () => {
  const {
    query: { recipeId }
  } = useRouter();

  const recipe = useSelector((state: State) =>
    state.recipes.publicRecipes.find((r) => r.id === recipeId)
  );

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
