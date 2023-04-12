import type { NextApiResponse, NextApiRequest } from "next";
import { render } from "@react-email/render";
import Email from "../../../../../emails/SendEmail";
import { sendEmail } from "@/utils/TransportEmail";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  console.log(req.body);
  await sendEmail({
    to: process.env.SMTP_USER
      ? process.env.SMTP_USER
      : "pontoeletronico@tekoa.dev.br",
    subject: "Pedido para testa o produto",
    html: render(Email({ data: data })),
  });

  return res.json({ message: "Email enviado com sucesso" });
}
