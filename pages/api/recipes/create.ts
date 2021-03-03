import { withApiAuthRequired } from '@auth0/nextjs-auth0';

import getConfig from 'next/config';

import getAxiosWithAuth from '~/utils/getAxiosWithAuth';

const {
  publicRuntimeConfig: { apiBase }
} = getConfig();

export default withApiAuthRequired(async function createRecipe(req, res) {
  try {
    const axios = await getAxiosWithAuth(req, res);

    const response = await axios.post(`${apiBase}/v1/recipes`, req.body);

    res.status(response.status || 200).json(response.data);
  } catch (error) {
    res.status(error.response?.data.error.status || 500).json({
      ...error.response?.data.error
    });
  }
});
