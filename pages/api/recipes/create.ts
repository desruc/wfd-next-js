import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import axios from 'axios';

import getConfig from 'next/config';

const {
  publicRuntimeConfig: { apiBase }
} = getConfig();

export default withApiAuthRequired(async function createRecipe(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res);

    const response = await axios.post(`${apiBase}/v1/recipes`, req.body, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    res.status(response.status || 200).json(response.data);
  } catch (error) {
    res.status(error.response?.data.error.status || 500).json({
      ...error.response?.data.error
    });
  }
});
