import prismaConnect from "@/server/db";
import type {
  ICompany,
  ICreateClockIn,
  ICreateCompanyClockInReq,
  IUser,
} from "@/server/interface";
import type { NextApiResponse } from "next";
import { boolean } from "zod";

export async function createClockIn(
  req: ICreateCompanyClockInReq,
  res: NextApiResponse
) {
  const { userId, location, obs, time } = req.body;

  if (userId === undefined || time === undefined) {
    return res.status(400).json({ message: "Must send user id and time" });
  }

  const findUser = await prismaConnect.users.findUnique({
    where: { id: userId },
  });

  if (!findUser) {
    return res.status(409).json({ message: "User not found" });
  }

  if (findUser.CompanyId !== req.request_id) {
    return res.status(401).json({ message: "Access denied" });
  }

  const clockIn: ICreateClockIn = await prismaConnect.clockIn.create({
    data: {
      userId: userId,
      companyId: findUser.CompanyId,
      time,
      location,
      obs,
    },
    include: {
      company: true,
      user: true,
    },
  });

  return res.json({ message: "clock in registered", body: clockIn });
}

export async function updateClockIn(
  req: ICreateCompanyClockInReq,
  res: NextApiResponse
) {
  const { id, time, location, obs, payment } = req.body;

  if (!id) {
    return res.status(400).json({ message: "must send a id" });
  }

  const findClockIn = await prismaConnect.clockIn.findUnique({
    where: { id },
  });

  if (!findClockIn) {
    return res.status(409).json({ message: "Clock In not found" });
  }

  if (findClockIn.companyId !== req.request_id) {
    return res.status(401).json({ message: "Access denied" });
  }

  const clockIn: ICreateClockIn = await prismaConnect.clockIn.update({
    where: { id },
    data: {
      time,
      location,
      obs,
      payment,
    },
    include: {
      company: true,
      user: true,
    },
  });

  return res.json({ message: "clock in updated", body: clockIn });
}

export async function deleteClockIn(
  req: { body: { id: string }; request_id: string },
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

  if (findClockIn.companyId !== req.request_id) {
    return res.status(401).json({ message: "Access denied" });
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
  req: { request_id: string },
  res: NextApiResponse
) {
  const clockIn = await prismaConnect.clockIn.findMany({
    where: { companyId: req.request_id },
    include: { user: true },
  });

  return res.json({ message: "Success", body: clockIn });
}

export async function listUniqueUserClockIn(
  req: { request_id: string; query: { id: string } },
  res: NextApiResponse
) {
  const { id } = req.query;

  const clockIn = await prismaConnect.clockIn.findMany({
    where: { companyId: req.request_id, userId: id },
    include: { user: true },
  });

  return res.json({ message: "Success", body: clockIn });
}

export async function reportsExcel(
  req: {
    request_id: string;
    query: { id: string; month: string; year: string; active: string };
  },
  res: NextApiResponse
) {
  const { id, month, year, active } = req.query;

  const clockIn = await prismaConnect.clockIn.findMany({
    where: { companyId: req.request_id },
    include: { user: true },
  });

  let body = clockIn;

  if (month) {
    body = body.filter(
      (ele) => Number(ele?.time?.split(" ")[0]?.split("/")[1]) === Number(month)
    );
  }

  if (year) {
    body = body.filter(
      (ele) => Number(ele?.time?.split(" ")[0]?.split("/")[2]) === Number(year)
    );
  }

  if (id) {
    body = body.filter((ele) => ele?.userId === id);
  }

  if (active) {
    body = body.filter((ele) => ele?.user?.isActive);
  }

  return res.json({ message: "Success", body });
}
