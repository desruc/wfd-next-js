import React from 'react';
import useSWR from 'swr';

import { NextPage } from 'next';

import BrowseContent from '~/screens/BrowseContent';

const BrowsePage: NextPage = () => {
  const { data } = useSWR('/api/recipes/public');

  return <BrowseContent recipes={data?.data} />;
};

export default BrowsePage;
