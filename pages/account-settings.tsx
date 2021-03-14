import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useSWR from 'swr';

import { NextPage } from 'next';

import Loader from '~/components/Global/Loader';
import ProfileContent from '~/screens/user/ProfileContent';

const CreateRecipePage: NextPage = () => {
  const { data: userResponse } = useSWR('/api/user');

  return (
    <Loader fullPage loading={!userResponse}>
      <ProfileContent user={userResponse?.data} />
    </Loader>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default CreateRecipePage;
