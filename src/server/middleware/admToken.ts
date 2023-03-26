import type { NextApiRequest, NextApiResponse } from "next";

export default function admPass(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  let pass = req.headers.authorization;

  if (!pass) {
    return res
      .status(400)
      .json("to access this route you need to send a password");
  }

  pass = pass.split(" ")[1];

  if (pass !== process.env.ADM_PASS) {
    return res
      .status(400)
      .json("to access this route you need to send s password");
  }
  next();
}
