import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import { NextPage } from 'next';

import UserRecipesContent from '~/screens/recipes/UserRecipesContent';

const UserRecipesPage: NextPage = () => {
  const {
    query: { userId }
  } = useRouter();

  const { data: userRecipes } = useSWR(`/api/recipes/u/${userId}`);

  const { data } = useSWR(`/api/user/${userId}`);

  return <UserRecipesContent recipes={userRecipes?.data} user={data?.data} />;
};

export default UserRecipesPage;
