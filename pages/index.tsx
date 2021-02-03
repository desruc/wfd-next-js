import React from 'react';
import { NextPage, GetServerSidePropsResult } from 'next';
import IndexContent from '~/screens/IndexContent';

import { wrapper } from '~/state/index';
import { getPublicRecipes } from '~/state/recipes/actions';

interface IndexProps {
  serverGreeting: string;
}

const IndexPage: NextPage<IndexProps> = (props: IndexProps) => {
  const { serverGreeting } = props;
  return <IndexContent serverGreeting={serverGreeting} />;
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }): Promise<GetServerSidePropsResult<IndexProps>> => {
    // Get recipes before page is rendered
    await store.dispatch(getPublicRecipes());

    return {
      props: {
        serverGreeting: 'Hello from the server!'
      }
    };
  }
);

export default IndexPage;
