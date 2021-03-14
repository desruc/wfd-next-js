import { withApiAuthRequired } from '@auth0/nextjs-auth0';

import getAxiosWithAuth from '~/utils/getAxiosWithAuth';

export default withApiAuthRequired(async function createRecipe(req, res) {
  const axios = await getAxiosWithAuth(req, res);

  if (req.method === 'PUT') {
    try {
      const response = await axios.put(`/v1/users`, req.body);

      res.status(response.status || 200).json(response.data);
    } catch (error) {
      res.status(error.response?.data.status || 500).json({
        ...error.response?.data
      });
    }
  } else if (req.method === 'GET') {
    try {
      const response = await axios.get(`/v1/users`);

      res.status(response.status || 200).json(response.data);
    } catch (error) {
      res.status(error.response?.data.status || 500).json({
        ...error.response?.data
      });
    }
  }
});
