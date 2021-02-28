import React from 'react';
import useSWR from 'swr';

import { NextPage } from 'next';

import IndexContent from '~/screens/IndexContent';

const IndexPage: NextPage = () => {
  const { data } = useSWR('/api/recipes/public');

  return <IndexContent recipes={data?.data} />;
};

export default IndexPage;
