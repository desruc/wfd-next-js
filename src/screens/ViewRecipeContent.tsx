import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { State } from 'wfd';

import RecipeHero from '~/components/Recipes/RecipeHero';
import RecipeMeta from '~/components/Recipes/RecipeMeta';

import { selectRecipe } from '~/state/recipes/selectors';

const ViewRecipeContent: React.FC = () => {
  const {
    query: { recipeId }
  } = useRouter();

  const recipe = useSelector((state: State) =>
    selectRecipe(state, recipeId as string)
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
