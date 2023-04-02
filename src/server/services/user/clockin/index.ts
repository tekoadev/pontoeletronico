/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import prismaConnect from "@/server/db";
import type {
  ICreateClockIn,
  ICreateCompanyClockInReq,
} from "@/server/interface";
import type { NextApiResponse } from "next";

export async function createClockIn(
  req: ICreateCompanyClockInReq,
  res: NextApiResponse
) {
  const { location, obs, type } = req.body;

  const findUser = await prismaConnect.users.findUnique({
    where: { id: req.request_id },
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
      userId: req.request_id,
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

export async function listClockIn(
  req: {
    request_id: any;
    user: string;
  },
  res: NextApiResponse
) {
  const clockIn = await prismaConnect.clockIn.findMany({
    where: { userId: req.request_id },
    include: { user: true },
  });

  return res.json({ message: "Success", body: clockIn });
}

export async function listByMonthClockIn(
  req: {
    request_id: any;
    user: string;
    query: { month: string };
  },
  res: NextApiResponse
) {
  const { month } = req.query;

  const clockIn = await prismaConnect.clockIn.findMany({
    where: { userId: req.request_id },
    include: { user: true },
  });

  const response = clockIn.map((elem) => {
    if (elem.time?.split("/")[1] === month) {
      return elem;
    }
  });

  return res.json({ message: "Success", body: response });
}
