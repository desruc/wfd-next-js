import { withApiAuthRequired } from '@auth0/nextjs-auth0';

import getAxiosWithAuth from '~/utils/getAxiosWithAuth';

export default withApiAuthRequired(async function editRecipe(req, res) {
  try {
    const {
      query: { recipeId }
    } = req;

    const axios = await getAxiosWithAuth(req, res);

    const response = await axios.put(`/v1/recipes/${recipeId}`, req.body);

    res.status(response.status || 200).json(response.data);
  } catch (error) {
    res.status(error.response?.data.status || 500).json(error.response?.data);
  }
});
