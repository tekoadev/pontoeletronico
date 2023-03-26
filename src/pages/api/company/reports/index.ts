/* eslint-disable @typescript-eslint/no-unsafe-argument */
import nc from "next-connect";
import onError from "@/server/middleware/errors";
import corsMiddleware from "@/server/middleware/cors";
import { reportUserByMonth } from "@/server/services/company/user";
import TokenMiddleware from "@/server/middleware/token";

const Handler = nc({ onError });

Handler.use(corsMiddleware);

Handler.use(TokenMiddleware);

Handler.get(reportUserByMonth);

export default Handler;
