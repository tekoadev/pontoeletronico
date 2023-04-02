/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

interface TokenMiddlewareProps extends NextApiRequest {
  request_id: string;
}

export default function TokenMiddleware(
  req: TokenMiddlewareProps,
  res: NextApiResponse,
  next: () => void
) {
  let token = req.headers.authorization;

  if (!token) {
    return res
      .status(400)
      .json("to access this route you need to send a token");
  }

  token = token.split(" ")[1];

  jwt.verify(token!, process.env.SECRET_KEY!, (error: any, decoded: any) => {
    if (error) {
      return res.status(401).json("Invalid Token");
    }
    req.request_id = decoded.sub;
  });

  next();
}
