import { withApiAuthRequired } from '@auth0/nextjs-auth0';

import getConfig from 'next/config';

import getAxiosWithAuth from '~/utils/getAxiosWithAuth';

const {
  publicRuntimeConfig: { apiBase }
} = getConfig();

export default withApiAuthRequired(async function createRecipe(req, res) {
  const axios = await getAxiosWithAuth(req, res);

  if (req.method === 'POST') {
    try {
      const {
        query: { recipeId }
      } = req;

      const response = await axios.post(
        `${apiBase}/v1/recipes/${recipeId}/rating`,
        req.body
      );

      res.status(response.status || 200).json(response.data);
    } catch (error) {
      res.status(error.response?.data.error.status || 500).json({
        ...error.response?.data.error
      });
    }
  } else if (req.method === 'GET') {
    try {
      const {
        query: { recipeId }
      } = req;

      const response = await axios.get(
        `${apiBase}/v1/recipes/${recipeId}/rating`
      );

      res.status(response.status || 200).json(response.data);
    } catch (error) {
      res.status(error.response?.data.error.status || 500).json({
        ...error.response?.data.error
      });
    }
  }
});
