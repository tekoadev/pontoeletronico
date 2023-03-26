/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import prismaConnect from "@/server/db";
import type {
  ICompany,
  ICreateUser,
  ICreateUserCompanyReq,
  IUser,
} from "@/server/interface";
import { hash } from "bcrypt";
import type { NextApiResponse } from "next";

export async function createUser(
  req: ICreateUserCompanyReq,
  res: NextApiResponse
) {
  const {
    cpf,
    name,
    password,
    hourly = true,
    isActive = true,
    phone,
    email,
  } = req.body;

  if (!cpf || !name || !password) {
    return res
      .status(400)
      .json({ message: "must send a company id, cpf, name and password" });
  }

  const findCompany: ICompany | null = await prismaConnect.company.findUnique({
    where: { id: req.user },
  });

  if (!findCompany) {
    return res.status(409).json({ message: "Company not found" });
  }

  const findUser: IUser | null = await prismaConnect.users.findUnique({
    where: { cpf },
  });

  if (findUser) {
    return res.status(409).json({ message: "User already exist" });
  }
  const hashedPassword = await hash(password.toString(), 10);

  const createUser: ICreateUser = await prismaConnect.users.create({
    data: {
      CompanyId: req.user,
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

export async function updateUser(
  req: ICreateUserCompanyReq,
  res: NextApiResponse
) {
  const {
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
  const findCompany: ICompany | null = await prismaConnect.company.findUnique({
    where: { id: req.user },
  });

  if (!findCompany) {
    return res.status(409).json({ message: "Company not found" });
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
      CompanyId: req.user,
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

export async function listAllUsers(
  req: { user: string },
  res: NextApiResponse
) {
  const user = await prismaConnect.users.findMany({
    where: { CompanyId: req.user },
    include: { clockin: true, session: true, company: true, _count: true },
  });

  return res.json({ message: "Success", body: user });
}

export async function listUniqueUser(
  req: { query: { id: string }; user: string },
  res: NextApiResponse
) {
  const { id } = req.query;

  const user = await prismaConnect.users.findUnique({
    where: { id: id },
    include: { clockin: true, session: true, company: true, _count: true },
  });

  if (user === null || user === undefined) {
    return res.status(409).json({ message: "User not found" });
  }

  if (user.CompanyId !== req.user) {
    return res.status(409).json({ message: "User not found" });
  }

  return res.json({ message: "Success", body: user });
}