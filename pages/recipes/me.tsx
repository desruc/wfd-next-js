import React from 'react';
import useSWR from 'swr';

import { NextPage } from 'next';

import AuthUserRecipesContent from '~/screens/recipes/AuthUserRecipesContent';

const AuthUserRecipesPage: NextPage = () => {
  const { data } = useSWR('/api/recipes/me');

  return <AuthUserRecipesContent recipes={data?.data} />;
};

export default AuthUserRecipesPage;
