/* eslint-disable @typescript-eslint/no-unsafe-argument */
import nc from "next-connect";
import onError from "@/server/middleware/errors";
import corsMiddleware from "@/server/middleware/cors";
import TokenMiddleware from "@/server/middleware/token";
import * as R from "@/server/services/company/user";

const Handler = nc({ onError });

Handler.use(corsMiddleware);

Handler.use(TokenMiddleware);

Handler.get(R.listAllUsers);

Handler.post(R.createUser);

Handler.patch(R.updateUser);

Handler.delete(R.deleteUser);

export default Handler;
