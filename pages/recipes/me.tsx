import React from 'react';
import useSWR from 'swr';

import { NextPage } from 'next';

import Loader from '~/components/Global/Loader';
import AuthUserRecipesContent from '~/screens/recipes/AuthUserRecipesContent';

const AuthUserRecipesPage: NextPage = () => {
  const { data } = useSWR('/api/recipes/me');

  return (
    <Loader loading={!data}>
      <AuthUserRecipesContent recipes={data?.data} />;
    </Loader>
  );
};

export default AuthUserRecipesPage;
