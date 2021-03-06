import React from 'react';
import { NextPage } from 'next';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import CreateRecipeContent from '~/screens/recipes/CreateOrEditRecipeContent';

const CreateRecipePage: NextPage = () => {
  return <CreateRecipeContent />;
};

export const getServerSideProps = withPageAuthRequired();

export default CreateRecipePage;
