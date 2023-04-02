import prismaConnect from "@/server/db";
import type { NextApiResponse } from "next";

export async function listSelfCompany(
  req: { request_id: string },
  res: NextApiResponse
) {
  const id = req.request_id;

  const company = await prismaConnect.company.findUnique({
    where: { id },
    include: { users: true, _count: true },
  });

  if (company === null || company === undefined) {
    return res.status(409).json({ message: "Company not found" });
  }

  return res.json({ message: "Success", body: company });
}
