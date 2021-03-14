import React, { useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import { NextPage } from 'next';

import Loader from '~/components/Global/Loader';
import ViewRecipeContent from '~/screens/recipes/ViewRecipeContent';

import useSnackbar from '~/hooks/useSnackbar';

const ViewRecipePage: NextPage = () => {
  const router = useRouter();

  const {
    query: { recipeId }
  } = router;

  const { openSnackbar } = useSnackbar();

  const { data: recipeResponse, error } = useSWR(`/api/recipes/${recipeId}`);

  const { data: ratingResponse } = useSWR(`/api/recipes/rating/${recipeId}`);

  useEffect(() => {
    if (error) {
      openSnackbar(
        'That recipe is currently unavailable to the public',
        'error'
      );
      router.push('/');
    }
  }, [error]);

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
