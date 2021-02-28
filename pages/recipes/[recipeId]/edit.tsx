import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import { NextPage } from 'next';

import EditRecipeContent from '~/screens/recipes/EditRecipeContent';

const CreateRecipePage: NextPage = () => {
  const {
    query: { recipeId }
  } = useRouter();

  const { data: recipeResponse } = useSWR(`/api/recipes/${recipeId}`);

  return <EditRecipeContent recipe={recipeResponse?.data} />;
};

export const getServerSideProps = withPageAuthRequired();

export default CreateRecipePage;
