import React from 'react';
import useSWR from 'swr';

import { NextPage } from 'next';

import Loader from '~/components/Global/Loader';
import BrowseContent from '~/screens/BrowseContent';

const BrowsePage: NextPage = () => {
  const { data } = useSWR('/api/recipes/public');

  return (
    <Loader loading={!data}>
      <BrowseContent recipes={data?.data} />;
    </Loader>
  );
};

export default BrowsePage;
