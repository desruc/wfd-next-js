import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import Loader from '~/components/Global/Loader';
import RecipeListContent from '~/screens/RecipeListContent';

const DifficultyPage: NextPage = () => {
  const {
    query: { difficulty }
  } = useRouter();

  const computedTitle = difficulty
    ? `${difficulty[0].toUpperCase()}${difficulty.slice(1)} recipes`
    : '';

  return (
    <Loader loading={!difficulty}>
      <RecipeListContent
        pageTitle={computedTitle}
        recipeUrl={`/api/recipes/public?difficulty=${difficulty}`}
      />
    </Loader>
  );
};

export default DifficultyPage;
