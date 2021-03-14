import { withApiAuthRequired } from '@auth0/nextjs-auth0';

import getAxiosWithAuth from '~/utils/getAxiosWithAuth';

export default withApiAuthRequired(async function getMyRecipes(req, res) {
  if (req.method === 'GET') {
    try {
      const { page, limit } = req.query;

      const computedPage = page || 0;

      const computedLimit = limit || 20;

      const axios = await getAxiosWithAuth(req, res);

      const response = await axios.get(
        `/v1/recipes/me?limit=${computedLimit}&page=${computedPage}`
      );

      res.status(response.status || 200).json(response.data);
    } catch (error) {
      res.status(error.response?.data.status || 500).json({
        ...error.response?.data
      });
    }
  }
});
