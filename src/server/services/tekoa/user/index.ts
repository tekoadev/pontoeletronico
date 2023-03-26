/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import prismaConnect from "@/server/db";
import type {
  ICompany,
  ICreateUser,
  ICreateUserReq,
  IUser,
} from "@/server/interface";
import { hash } from "bcrypt";
import type { NextApiResponse } from "next";

export async function createUser(req: ICreateUserReq, res: NextApiResponse) {
  const {
    user,
    company_id,
    cpf,
    name,
    password,
    hourly = true,
    isActive = true,
    phone,
    email,
  } = req.body;

  if (!user || !company_id || !cpf || !name || !password) {
    return res
      .status(400)
      .json({ message: "must send a user, company id, cpf, name and password" });
  }

  const findCompany: ICompany | null = await prismaConnect.company.findUnique({
    where: { id: company_id },
  });

  if (!findCompany) {
    return res.status(409).json({ message: "Company not found" });
  }

  const findUser: IUser | null = await prismaConnect.users.findUnique({
    where: { user },
  });

  if (findUser) {
    return res.status(409).json({ message: "User already exist" });
  }
  const hashedPassword = await hash(password.toString(), 10);

  const createUser: ICreateUser = await prismaConnect.users.create({
    data: {
      user,
      CompanyId: company_id,
      cpf,
      name,
      password: hashedPassword,
      hourly,
      isActive,
      phone,
      email,
    },
  });

  return res.json({ message: "User created", body: createUser });
}

export async function updateUser(req: ICreateUserReq, res: NextApiResponse) {
  const {
    company_id,
    id,
    cpf,
    name,
    password,
    hourly = true,
    isActive = true,
    phone,
    email,
  } = req.body;

  if (!id) {
    return res.status(400).json({ message: "must send a company id" });
  }
  if (company_id) {
    const findCompany: ICompany | null = await prismaConnect.company.findUnique(
      {
        where: { id: company_id },
      }
    );

    if (!findCompany) {
      return res.status(409).json({ message: "Company not found" });
    }
  }

  const findUser: IUser | null = await prismaConnect.users.findUnique({
    where: { id },
  });

  if (!findUser) {
    return res.status(409).json({ message: "User not found" });
  }
  let hashedPassword = undefined;

  if (password) {
    hashedPassword = await hash(password.toString(), 10);
  }

  const updateUser: ICreateUser = await prismaConnect.users.update({
    where: { id },
    data: {
      CompanyId: company_id,
      cpf,
      name,
      password: hashedPassword,
      hourly,
      isActive,
      phone,
      email,
    },
  });

  return res.json({ message: "User updated", body: updateUser });
}

export async function deleteUser(
  req: { body: { id: string } },
  res: NextApiResponse
) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "must send a id" });
  }

  const findUser: IUser | null = await prismaConnect.users.findUnique({
    where: { id },
  });

  if (findUser === null || findUser === undefined) {
    return res.status(409).json({ message: "User not found" });
  }

  const deleteUser: ICreateUser = await prismaConnect.users.delete({
    where: { id },
  });

  return res.json({ message: "User delete", body: deleteUser });
}

export async function listAllUsers(req: any, res: NextApiResponse) {
  const user = await prismaConnect.users.findMany({
    include: { session: true, company: true, _count: true },
  });

  return res.json({ message: "Success", body: user });
}

export async function listUniqueUser(
  req: { query: { id: string } },
  res: NextApiResponse
) {
  const { id } = req.query;

  const user = await prismaConnect.users.findUnique({
    where: { id },
    include: { clockin: true, session: true, company: true, _count: true },
  });

  const company = await prismaConnect.company.findUnique({
    where: { id },
    include: { clockin: true, session: true, _count: true },
  });

  if (
    (user === null || user === undefined) &&
    (company === null || company === undefined)
  ) {
    return res.status(409).json({ message: "not found" });
  }

  return res.json({
    message: "Success",
    body: user === null || user === undefined ? company : user,
  });
}
