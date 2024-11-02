import nodemailer from "nodemailer";

interface IPayload {
  to: string;
  subject: string;
  html: string;
}

const transport = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: true,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
};

export const sendEmail = async (data: IPayload) => {
  const transporter = nodemailer.createTransport({
    ...transport,
  });

  return transporter.sendMail({
    from: process.env.SMTP_USER,
    ...data,
  });
};
