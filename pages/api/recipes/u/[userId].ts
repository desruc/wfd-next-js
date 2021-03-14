import { NextApiRequest, NextApiResponse } from 'next';

import getAxiosWithAuth from '~/utils/getAxiosWithAuth';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'GET') {
    try {
      const {
        query: { userId }
      } = req;

      const { page, limit } = req.query;

      const computedPage = page || 0;

      const computedLimit = limit || 20;

      const axios = await getAxiosWithAuth(req, res);

      const response = await axios.get(
        `/v1/recipes/user/${userId}?limit=${computedLimit}&page=${computedPage}`
      );

      res.status(response.status || 200).json(response.data);
    } catch (error) {
      res.status(error.response?.data.status || 500).json({
        ...error.response?.data
      });
    }
  }
};
