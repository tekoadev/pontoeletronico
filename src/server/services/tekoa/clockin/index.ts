import prismaConnect from "@/server/db";
import type {
  ICompany,
  ICreateClockIn,
  ICreateClockInReq,
  IUser,
} from "@/server/interface";
import type { NextApiResponse } from "next";

export async function createClockIn(
  req: ICreateClockInReq,
  res: NextApiResponse
) {
  const { userId, location, obs, type } = req.body;

  const findUser = await prismaConnect.users.findUnique({
    where: { id: userId },
  });

  if (!findUser) {
    return res.status(409).json({ message: "User not found" });
  }

  const time = new Date()
    .toLocaleTimeString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
    .toString();

  const clockIn: ICreateClockIn = await prismaConnect.clockIn.create({
    data: {
      userId: userId,
      companyId: findUser.CompanyId,
      time,
      location,
      obs,
      type,
    },
    include: {
      company: true,
      user: true,
    },
  });

  return res.json({ message: "clock in registered", clockIn });
}

export async function updateClockIn(
  req: ICreateClockInReq,
  res: NextApiResponse
) {
  const { id, time, location, obs, type } = req.body;

  if (!id) {
    return res.status(400).json({ message: "must send a id" });
  }

  const findClockIn = await prismaConnect.clockIn.findUnique({
    where: { id },
  });

  if (!findClockIn) {
    return res.status(409).json({ message: "Clock In not found" });
  }

  const clockIn: ICreateClockIn = await prismaConnect.clockIn.update({
    where: { id },
    data: {
      time,
      location,
      obs,
      type,
    },
    include: {
      company: true,
      user: true,
    },
  });

  return res.json({ message: "clock in updated", clockIn });
}

export async function deleteClockIn(
  req: { body: { id: string } },
  res: NextApiResponse
) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "must send a id" });
  }

  const findClockIn = await prismaConnect.clockIn.findUnique({
    where: { id },
  });

  if (!findClockIn) {
    return res.status(409).json({ message: "Clock In not found" });
  }

  const clockIn: ICreateClockIn = await prismaConnect.clockIn.delete({
    where: { id },
    include: {
      company: true,
      user: true,
    },
  });

  return res.json({ message: "clock in deleted", clockIn });
}

export async function listClockIn(
  req: { body: { userId?: string; companyId?: string } },
  res: NextApiResponse
) {
  const { userId, companyId } = req.body;

  if (!userId && !companyId) {
    return res.status(400).json({ message: "must send a userId or companyId" });
  }

  if (companyId) {
    const findCompany: ICompany | null = await prismaConnect.company.findUnique(
      {
        where: { id: companyId },
      }
    );

    if (!findCompany) {
      return res.status(409).json({ message: "Company not found" });
    }
  }

  if (userId) {
    const findUser: IUser | null = await prismaConnect.users.findUnique({
      where: { id: userId },
    });

    if (!findUser) {
      return res.status(409).json({ message: "User not found" });
    }
  }

  const clockIn = await prismaConnect.clockIn.findMany({
    where: { userId, companyId },
    include: { company: true, user: true },
  });

  return res.json({ message: "Success", clockIn });
}
