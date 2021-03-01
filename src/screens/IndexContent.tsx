import React from 'react';
import { useRouter } from 'next/router';

import { Recipe } from 'wfd';

import RecipeCardList from '~/components/Recipes/RecipeCardList';
import HomeHero from '~/components/Home/HomeHero';

interface IndexProps {
  recipes: Recipe[];
}

const IndexContent: React.FC<IndexProps> = ({ recipes }: IndexProps) => {
  const router = useRouter();

  const onRecipeClick = ({ id: recipeId }) =>
    router.push(`/recipes/${recipeId}`);

  const featuredRecipe = recipes ? recipes[0] : null;

  return (
    <div>
      <HomeHero recipe={featuredRecipe} />
      <RecipeCardList
        title="Recent Recipes"
        link="/browse"
        recipes={recipes}
        onRecipeClick={onRecipeClick}
      />
      <RecipeCardList
        title="Popular Recipes"
        link="/browse"
        recipes={recipes}
        onRecipeClick={onRecipeClick}
      />
    </div>
  );
};

export default IndexContent;
