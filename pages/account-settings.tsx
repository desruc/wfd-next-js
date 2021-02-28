import React, { useEffect } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useSWR from 'swr';

import { NextPage } from 'next';

import ProfileContent from '~/screens/user/ProfileContent';

const CreateRecipePage: NextPage = () => {
  const { data: userResponse } = useSWR('/api/user');

  useEffect(() => {
    if (userResponse?.data) {
      window.localStorage.setItem('uid', userResponse.data.id);
    }
  }, [userResponse]);

  return <ProfileContent user={userResponse?.data} />;
};

export const getServerSideProps = withPageAuthRequired();

export default CreateRecipePage;
