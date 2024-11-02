/* eslint-disable @typescript-eslint/no-unsafe-argument */
import nc from "next-connect";
import onError from "@/server/middleware/errors";
import corsMiddleware from "@/server/middleware/cors";
import admPass from "@/server/middleware/admToken";

import * as R from "../../../../server/services/tekoa/user";

const Handler = nc({ onError });

Handler.use(corsMiddleware);

Handler.use(admPass);

Handler.get(R.listAllUsers);

Handler.post(R.createUser);

Handler.patch(R.updateUser);

Handler.delete(R.deleteUser);

export default Handler;
