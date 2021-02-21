import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

import getConfig from 'next/config';

import axios from 'axios';

const {
  publicRuntimeConfig: { apiBase }
} = getConfig();

export default withApiAuthRequired(async function createRecipe(req, res) {
  if (req.method === 'POST') {
    try {
      const { accessToken } = await getAccessToken(req, res);

      const {
        query: { recipeId }
      } = req;

      const response = await axios.post(
        `${apiBase}/v1/recipes/${recipeId}/rating`,
        req.body,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      res.status(response.status || 200).json(response.data);
    } catch (error) {
      res.status(error.response?.data.error.status || 500).json({
        ...error.response?.data.error
      });
    }
  } else if (req.method === 'GET') {
    try {
      const { accessToken } = await getAccessToken(req, res);

      const {
        query: { recipeId }
      } = req;

      const response = await axios.get(
        `${apiBase}/v1/recipes/${recipeId}/rating`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      res.status(response.status || 200).json(response.data);
    } catch (error) {
      res.status(error.response?.data.error.status || 500).json({
        ...error.response?.data.error
      });
    }
  }
});
