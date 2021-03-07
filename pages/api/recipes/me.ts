import { withApiAuthRequired } from '@auth0/nextjs-auth0';

import getAxiosWithAuth from '~/utils/getAxiosWithAuth';

export default withApiAuthRequired(async function getMyRecipes(req, res) {
  if (req.method === 'GET') {
    try {
      const axios = await getAxiosWithAuth(req, res);

      const response = await axios.get(`/v1/recipes/me`);

      res.status(response.status || 200).json(response.data);
    } catch (error) {
      res.status(error.response?.data.error.status || 500).json({
        ...error.response?.data.error
      });
    }
  }
});
