import React from 'react';
import { useRouter } from 'next/router';

import { Recipe } from 'wfd';

import Link from 'next/link';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

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
      <Box
        marginTop={8}
        marginBottom={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4">Recent Recipes</Typography>
        <Link href="/browse">
          <a>See more</a>
        </Link>
      </Box>
      <RecipeCardList recipes={recipes} onRecipeClick={onRecipeClick} />
    </div>
  );
};

export default IndexContent;
