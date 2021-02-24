import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import axios from 'axios';

import getConfig from 'next/config';

const {
  publicRuntimeConfig: { apiBase }
} = getConfig();

export default withApiAuthRequired(async function createRecipe(req, res) {
  if (req.method === 'PUT') {
    try {
      const { accessToken } = await getAccessToken(req, res);

      const response = await axios.put(`${apiBase}/v1/users`, req.body, {
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
  } else if (req.method === 'GET') {
    try {
      const { accessToken } = await getAccessToken(req, res);

      const response = await axios.get(`${apiBase}/v1/users`, {
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
  }
});
