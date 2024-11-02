/* eslint-disable @typescript-eslint/no-unsafe-argument */
import nc from "next-connect";
import onError from "@/server/middleware/errors";
import corsMiddleware from "@/server/middleware/cors";
import companyLogin from "@/server/services/company/auth";

const Handler = nc({ onError });

Handler.use(corsMiddleware);

Handler.post(companyLogin);

export default Handler;