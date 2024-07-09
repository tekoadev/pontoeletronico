/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import prismaConnect from "@/server/db";
import type {
  ICompany,
  ICreateUser,
  ICreateUserCompanyReq,
  IUser,
} from "@/server/interface/backEnd";
import { hash } from "bcrypt";
import type { NextApiResponse } from "next";

export async function createUser(
  req: ICreateUserCompanyReq,
  res: NextApiResponse
) {
  const {
    user,
    cpf,
    name,
    password,
    hourly = true,
    isActive = true,
    phone,
    email,
    isAdm = false,
    location = true,
  } = req.body;

  if (!cpf || !name || !password) {
    return res
      .status(400)
      .json({ message: "must send a company id, cpf, name and password" });
  }

  const findCompany = await prismaConnect.company.findUnique({
    where: { id: req.request_id },
  });

  if (!findCompany) {
    return res.status(409).json({ message: "Company not found" });
  }

  const findUser = await prismaConnect.users.findUnique({
    where: { user },
  });

  if (findUser) {
    return res.status(409).json({ message: "User already exist" });
  }
  const hashedPassword = await hash(password.toString(), 10);

  const createUser: ICreateUser = await prismaConnect.users.create({
    data: {
      user,
      CompanyId: req.request_id,
      cpf,
      name,
      password: hashedPassword,
      hourly,
      isActive,
      phone,
      email,
      location,
      isAdm,
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
    user,
    cpf,
    name,
    password,
    hourly = true,
    isActive = true,
    phone,
    email,
    isAdm = false,
    location = true,
  } = req.body;

  if (!id) {
    return res.status(400).json({ message: "must send a company id" });
  }
  const findCompany = await prismaConnect.company.findUnique({
    where: { id: req.request_id },
  });

  if (!findCompany) {
    return res.status(409).json({ message: "Company not found" });
  }

  const userExist = await prismaConnect.users.findUnique({
    where: { id },
  });

  if (!userExist) {
    return res.status(409).json({ message: "User not found" });
  }

  const findUser = await prismaConnect.users.findUnique({
    where: { user },
  });

  if (findUser) {
    return res.status(409).json({ message: "User already exist" });
  }

  let hashedPassword = undefined;

  if (password) {
    hashedPassword = await hash(password.toString(), 10);
  }

  const updateUser: ICreateUser = await prismaConnect.users.update({
    where: { id },
    data: {
      CompanyId: req.request_id,
      user,
      cpf,
      name,
      password: hashedPassword,
      hourly,
      isActive,
      phone,
      email,
      isAdm,
      location,
    },
  });

  return res.json({ message: "User updated", body: updateUser });
}

export async function deleteUser(
  req: { body: { id: string }; request_id: string },
  res: NextApiResponse
) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "must send a id" });
  }

  const findUser = await prismaConnect.users.findUnique({
    where: { id },
  });

  if (findUser === null || findUser === undefined) {
    return res.status(409).json({ message: "User not found" });
  }

  if (findUser.CompanyId !== req.request_id) {
    res.status(401).json({ message: "Invalid credentials" });
  }

  const deleteUser: ICreateUser = await prismaConnect.users.delete({
    where: { id },
  });

  return res.json({ message: "User delete", body: deleteUser });
}

export async function listAllUsers(
  req: {
    request_id: any;
    user: string;
  },
  res: NextApiResponse
) {
  const user = await prismaConnect.users.findMany({
    where: { CompanyId: req.request_id },
    include: { _count: true },
  });

  return res.json({ message: "Success", body: user });
}

export async function listUniqueUser(
  req: {
    request_id: string;
    query: { id: string };
    user: string;
  },
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

  if (user.CompanyId !== req.request_id) {
    return res.status(409).json({ message: "User not found" });
  }

  return res.json({ message: "Success", body: user });
}

export async function reportUserByMonth(
  req: {
    request_id: any;
    query: { id: string; month: string; year: string };
    user: string;
  },
  res: NextApiResponse
) {
  const { id, month, year } = req.query;

  if (id === undefined || month === undefined || year === undefined) {
    return res.status(400).json({ message: "must send id, month and year" });
  }

  const clockIn = await prismaConnect.clockIn.findMany({
    where: { userId: id, companyId: req.request_id },
  });

  if (clockIn === null || clockIn === undefined) {
    return res.status(409).json({ message: "User not found" });
  }

  const body = clockIn.filter(
    (elem) =>
      Number(elem.time?.split(" ")[0]?.split("/")[1]) === Number(month) &&
      Number(elem.time?.split(" ")[0]?.split("/")[2]) === Number(year)
  );

  return res.json({
    message: "Success",
    body: body === undefined || body === null ? [] : body,
  });
}
