import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import axios from 'axios';

export default withApiAuthRequired(async function publicRecipes(req, res) {
  if (req.method === 'POST') {
    try {
      const { accessToken } = await getAccessToken(req, res);

      const baseURL =
        process.env.API_BASE_ROUTE?.indexOf('http') === 0
          ? process.env.API_BASE_ROUTE
          : `https://${process.env.API_BASE_ROUTE}`;

      const response = await axios.post(`${baseURL}/v1/recipes`, req.body, {
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
