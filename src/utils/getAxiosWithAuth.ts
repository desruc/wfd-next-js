import axios, { AxiosInstance } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken } from '@auth0/nextjs-auth0';

const axiosWithAuth = axios.create();

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<AxiosInstance> => {
  const authData = await getAccessToken(req, res).catch(() => null);

  axiosWithAuth.defaults.headers = authData
    ? { Authorization: `Bearer ${authData.accessToken}` }
    : {};

  return axiosWithAuth;
};
