import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import { NextPage } from 'next';

import ViewRecipeContent from '~/screens/recipes/ViewRecipeContent';

const ViewRecipePage: NextPage = () => {
  const {
    query: { recipeId }
  } = useRouter();

  const { data: recipeResponse } = useSWR(`/api/recipes/${recipeId}`);

  const { data: ratingResponse } = useSWR(`/api/recipes/rating/${recipeId}`);

  return (
    <ViewRecipeContent
      recipe={recipeResponse?.data}
      authUserRating={ratingResponse?.data}
    />
  );
};

export default ViewRecipePage;
