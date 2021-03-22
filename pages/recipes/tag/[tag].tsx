import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import RecipeListContent from '~/screens/RecipeListContent';

const TagPage: NextPage = () => {
  const {
    query: { tag }
  } = useRouter();

  return (
    <RecipeListContent
      pageTitle={`Recipes with the tag: ${tag}`}
      recipeUrl={`/api/recipes/public?tags=${tag}`}
    />
  );
};

export default TagPage;
