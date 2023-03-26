/* eslint-disable @typescript-eslint/no-unsafe-argument */
import nc from "next-connect";
import onError from "@/server/middleware/errors";
import corsMiddleware from "@/server/middleware/cors";
import admPass from "@/server/middleware/admToken";

import * as R from "../../../../server/services/tekoa/clockin";

const Handler = nc({ onError });

Handler.use(corsMiddleware);

Handler.use(admPass);

Handler.get(R.listUniqueClockIn);

export default Handler;
