/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

const corsMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200
  })
  next()
}

export default corsMiddleware
