import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import { NextPage } from 'next';

import Loader from '~/components/Global/Loader';
import ViewRecipeContent from '~/screens/recipes/ViewRecipeContent';

const ViewRecipePage: NextPage = () => {
  const {
    query: { recipeId }
  } = useRouter();

  const { data: recipeResponse } = useSWR(`/api/recipes/${recipeId}`);

  const { data: ratingResponse } = useSWR(`/api/recipes/rating/${recipeId}`);

  const loading = !recipeResponse && !ratingResponse;

  return (
    <Loader loading={loading}>
      <ViewRecipeContent
        recipe={recipeResponse?.data}
        authUserRating={ratingResponse?.data}
      />
    </Loader>
  );
};

export default ViewRecipePage;
