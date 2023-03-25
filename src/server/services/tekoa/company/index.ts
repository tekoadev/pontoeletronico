/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import prismaConnect from "@/server/db";
import type {
  ICompany,
  ICreateCompany,
  ICreateCompanyReq,
} from "@/server/interface";
import { hash } from "bcrypt";
import type { NextApiResponse } from "next";

export async function createCompany(
  req: ICreateCompanyReq,
  res: NextApiResponse
) {
  const { name, cnpj, logo, isActive = true, password } = req.body;

  if (!name || !cnpj || !password) {
    return res
      .status(400)
      .json({ message: "must send a name, password and cnpj" });
  }

  const findCompany: ICompany | null = await prismaConnect.company.findUnique({
    where: { cnpj },
  });

  if (findCompany) {
    return res.status(409).json({ message: "Company already exist" });
  }
  const hashedPassword = await hash(password.toString(), 10);

  const createCompany: ICreateCompany = await prismaConnect.company.create({
    data: {
      name,
      cnpj,
      logo,
      isActive,
      password: hashedPassword,
    },
  });

  return res.json({ message: "Company created", company: createCompany });
}

export async function updateCompany(
  req: ICreateCompanyReq,
  res: NextApiResponse
) {
  const { id, name, cnpj, logo, isActive = true, password } = req.body;

  if (!id) {
    return res.status(400).json({ message: "must send a id" });
  }

  const findCompany: ICompany | null = await prismaConnect.company.findUnique({
    where: { id },
  });

  if (findCompany === null || findCompany === undefined) {
    return res.status(409).json({ message: "Company not found" });
  }

  let hashedPassword = undefined;

  if (password) {
    hashedPassword = await hash(password.toString(), 10);
  }
  const createCompany: ICreateCompany = await prismaConnect.company.update({
    where: { id },
    data: {
      name,
      cnpj,
      logo,
      isActive,
      password: hashedPassword,
    },
  });

  return res.json({ message: "Company updated", company: createCompany });
}

export async function deleteCompany(
  req: { body: { id: string } },
  res: NextApiResponse
) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "must send a id" });
  }

  const findCompany: ICompany | null = await prismaConnect.company.findUnique({
    where: { id },
  });

  if (findCompany === null || findCompany === undefined) {
    return res.status(409).json({ message: "Company not found" });
  }

  const createCompany: ICreateCompany = await prismaConnect.company.delete({
    where: { id },
  });

  return res.json({ message: "Company delete", company: createCompany });
}

export async function listAllCompany(req: any, res: NextApiResponse) {
  const companys = await prismaConnect.company.findMany({
    include: { clockin: true, session: true, users: true },
  });

  return res.json({ message: "Success", companys: companys });
}

export async function listUniqueCompany(
  req: { query: { id: string } },
  res: NextApiResponse
) {
  const { id } = req.query;

  const company = await prismaConnect.company.findUnique({
    where: { id },
    include: { clockin: true, session: true, users: true },
  });

  if (company === null || company === undefined) {
    return res.status(409).json({ message: "Company not found" });
  }

  return res.json({ message: "Success", company });
}
