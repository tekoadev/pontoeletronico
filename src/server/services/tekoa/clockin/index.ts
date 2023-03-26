import prismaConnect from "@/server/db";
import type {
  ICompany,
  ICreateClockIn,
  ICreateClockInReq,
  IUser,
} from "@/server/interface";
import type { NextApiRequest, NextApiResponse } from "next";

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

  return res.json({ message: "clock in registered", body: clockIn });
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

  return res.json({ message: "clock in updated", body: clockIn });
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

  return res.json({ message: "clock in deleted", body: clockIn });
}

export async function listClockIn(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const clockIn = await prismaConnect.clockIn.findMany({
    include: { company: true, user: true },
  });
  return res.json({ message: "Success", body: clockIn });
}

export async function listUniqueClockIn(
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

  if (user) {
    const clockIn = await prismaConnect.clockIn.findMany({
      where: { userId: user.id },
      include: { company: true, user: true },
    });
    return res.json({ message: "Success", body: clockIn });
  }

  if (company) {
    const clockIn = await prismaConnect.clockIn.findMany({
      where: { companyId: company.id },
      include: { company: true, user: true },
    });
    return res.json({ message: "Success", body: clockIn });
  }
}
