import { NextApiRequest, NextApiResponse } from 'next';

import getAxiosWithAuth from '~/utils/getAxiosWithAuth';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const {
      query: { recipeId }
    } = req;

    const axios = await getAxiosWithAuth(req, res);

    const response = await axios.get(`/v1/recipes/${recipeId}`);

    res.status(response.status || 200).json(response.data);
  } catch (error) {
    res.status(error.response?.data.error.status || 500).json({
      ...error.response?.data.error
    });
  }
};
