import React from 'react';
import { NextPage } from 'next';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import ProfileContent from '~/screens/user/ProfileContent';

const CreateRecipePage: NextPage = () => {
  return <ProfileContent />;
};

export const getServerSideProps = withPageAuthRequired();

export default CreateRecipePage;
