/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import prismaConnect from "@/server/db";
import type { NextApiRequest, NextApiResponse } from "next";

interface userLoginReq extends NextApiRequest {
  body: {
    user: string;
    password: string;
  };
}

export default async function userLogin(
  req: userLoginReq,
  res: NextApiResponse
) {
  const { user, password } = req.body;

  if (!user || !password) {
    return res
      .status(400)
      .json({ message: "must send a company CNPJ and password" });
  }

  const findUser = await prismaConnect.users.findUnique({
    where: { user },
    include: { company: true },
  });

  if (!findUser) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (!findUser.isActive) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (!compareSync(password, findUser.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = jwt.sign(
    {
      id: findUser.id,
      name: findUser.name,
    },
    process.env.SECRET_KEY!,
    { expiresIn: "72000h", subject: findUser.id }
  );

  return res.json({ message: "Success", accessToken, body: findUser });
}
