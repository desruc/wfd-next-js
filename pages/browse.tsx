import React from 'react';
import { NextPage } from 'next';

import RecipeListContent from '~/screens/RecipeListContent';

const BrowsePage: NextPage = () => {
  return (
    <RecipeListContent pageTitle="Browse" recipeUrl="/api/recipes/public" />
  );
};

export default BrowsePage;
