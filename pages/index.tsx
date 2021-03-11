import React from 'react';
import useSWR from 'swr';

import { NextPage } from 'next';

import Loader from '~/components/Global/Loader';
import IndexContent from '~/screens/IndexContent';

const IndexPage: NextPage = () => {
  const { data } = useSWR('/api/recipes/public?limit=12');

  return (
    <Loader loading={!data}>
      <IndexContent recipes={data?.data} />;
    </Loader>
  );
};

export default IndexPage;
