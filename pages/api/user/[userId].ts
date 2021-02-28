import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import getConfig from 'next/config';

const {
  publicRuntimeConfig: { apiBase }
} = getConfig();

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'GET') {
    try {
      const {
        query: { userId }
      } = req;

      const response = await axios.get(`${apiBase}/v1/users/${userId}`);

      res.status(response.status || 200).json(response.data);
    } catch (error) {
      res.status(error.response?.data.error.status || 500).json({
        ...error.response?.data.error
      });
    }
  }
};
