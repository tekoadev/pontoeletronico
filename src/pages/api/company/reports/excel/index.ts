/* eslint-disable @typescript-eslint/no-unsafe-argument */
import nc from "next-connect";
import onError from "@/server/middleware/errors";
import corsMiddleware from "@/server/middleware/cors";
import TokenMiddleware from "@/server/middleware/token";
import { reportsExcel } from "@/server/services/company/clockin";

const Handler = nc({ onError });

Handler.use(corsMiddleware);

Handler.use(TokenMiddleware);

Handler.get(reportsExcel);

export default Handler;
