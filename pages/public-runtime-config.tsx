import React from 'react';

import { NextPage } from 'next';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const PublicRuntimeConfigPage: NextPage = () => (
  <>{JSON.stringify(publicRuntimeConfig)}</>
);

export default PublicRuntimeConfigPage;
