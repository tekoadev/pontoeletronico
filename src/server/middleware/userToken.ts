/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { useContext } from "react";
import { BackEndContext } from "../../context/BackEnd";

export default function UserTokenMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  const { setUser } = useContext(BackEndContext);
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
    setUser(decoded.sub);
  });
}
