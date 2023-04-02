/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { NextApiRequest, NextApiResponse } from "next";

export default (func: any) =>
  (req: NextApiRequest, res: NextApiResponse, next: () => void) =>
    Promise.resolve(func(req, res, next)).catch(next);
