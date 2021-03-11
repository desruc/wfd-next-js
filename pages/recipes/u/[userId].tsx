import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import { NextPage } from 'next';

import Loader from '~/components/Global/Loader';
import UserRecipesContent from '~/screens/recipes/UserRecipesContent';

const UserRecipesPage: NextPage = () => {
  const {
    query: { userId }
  } = useRouter();

  const { data: userRecipes } = useSWR(`/api/recipes/u/${userId}`);

  const { data: userData } = useSWR(`/api/user/${userId}`);

  const loading = !userRecipes && !userData;

  return (
    <Loader loading={loading}>
      <UserRecipesContent recipes={userRecipes?.data} user={userData?.data} />;
    </Loader>
  );
};

export default UserRecipesPage;
