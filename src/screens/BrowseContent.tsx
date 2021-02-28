import React from 'react';
import { useRouter } from 'next/router';

import { Recipe } from 'wfd';

import RecipeCardList from '~/components/Recipes/RecipeCardList';

interface IndexProps {
  recipes: Recipe[];
}

const BrowseContent: React.FC<IndexProps> = ({ recipes }: IndexProps) => {
  const router = useRouter();

  const onRecipeClick = ({ id: recipeId }) =>
    router.push(`/recipes/${recipeId}`);

  return (
    <div>
      <RecipeCardList recipes={recipes} onRecipeClick={onRecipeClick} />
    </div>
  );
};

export default BrowseContent;
