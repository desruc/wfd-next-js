import { NextApiRequest, NextApiResponse } from 'next';

import getConfig from 'next/config';

import getAxiosWithAuth from '~/utils/getAxiosWithAuth';

const {
  publicRuntimeConfig: { apiBase }
} = getConfig();

export default async function publicRecipes(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const axios = await getAxiosWithAuth(req, res);

    const response = await axios.get(`${apiBase}/v1/recipes`);

    res.status(response.status || 200).json(response.data);
  } catch (error) {
    res.status(error.response?.data.error.status || 500).json({
      ...error.response?.data.error
    });
  }
}
