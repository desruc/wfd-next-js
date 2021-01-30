import React from 'react';
import { NextPage, GetServerSidePropsResult } from 'next';
import IndexContent from '~/screens/IndexContent';

import { wrapper } from '~/state/index';

interface IndexProps {
  serverGreeting: string;
}

const IndexPage: NextPage<IndexProps> = (props: IndexProps) => {
  const { serverGreeting } = props;
  return <IndexContent serverGreeting={serverGreeting} />;
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (): Promise<GetServerSidePropsResult<IndexProps>> => {
    return {
      props: {
        serverGreeting: 'Hello from the server!'
      }
    };
  }
);

export default IndexPage;
