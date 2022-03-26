// import BlackToken from "../models/model.blacktoken";

import { config } from "../config";

export const cronController = async () => {
	console.log("CRON JOB START");
	config.prisma.blackToken.deleteMany();
};
