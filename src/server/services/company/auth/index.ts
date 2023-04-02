/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import prismaConnect from "@/server/db";
import type { NextApiRequest, NextApiResponse } from "next";

interface companyLoginReq extends NextApiRequest {
  body: {
    cnpj: string;
    password: string;
  };
}

export default async function companyLogin(
  req: companyLoginReq,
  res: NextApiResponse
) {
  const { cnpj, password } = req.body;

  if (!cnpj || !password) {
    return res
      .status(400)
      .json({ message: "must send a company CNPJ and password" });
  }

  const findCompany = await prismaConnect.company.findUnique({
    where: { cnpj },
    include: { users: true },
  });

  if (!findCompany) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (!findCompany.isActive) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (!compareSync(password, findCompany.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = jwt.sign(
    {
      id: findCompany.id,
      name: findCompany.name,
    },
    process.env.SECRET_KEY!,
    { expiresIn: "72000h", subject: findCompany.id }
  );

  return res.json({ message: "Success", accessToken, body: findCompany });
}
