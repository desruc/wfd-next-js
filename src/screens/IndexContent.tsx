import React from 'react';
import getConfig from 'next/config';

import Button from '@material-ui/core/Button';

import PageHeader from '~/components/PageHeader';

const { publicRuntimeConfig } = getConfig();

interface IndexProps {
  serverGreeting: string;
}

const IndexContent: React.FC<IndexProps> = (props) => {
  const { serverGreeting } = props;

  return (
    <div>
      <PageHeader title="WFD" />
      <h1>{serverGreeting}</h1>
      <h1>{publicRuntimeConfig.greeting}</h1>
      <Button color="secondary" variant="contained">
        Material-UI Button
      </Button>
    </div>
  );
};

export default IndexContent;
