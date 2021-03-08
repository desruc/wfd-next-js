import { NextApiRequest, NextApiResponse } from 'next';

export default async function status(
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  res.status(200).json({
    message: 'Alive and kicking'
  });
}
