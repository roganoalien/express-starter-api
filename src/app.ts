import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import cron from "node-cron";
// import passportMiddleware from "./middlewares/passport";
// CONFIG
import { config } from "./config";
import { cronController } from "./controllers/controller.cron";
// ROUTES
// import GetUrl from "./api/api.url";
// import Auth from "./api/api.auth";
// USER DATA
import useragent from "express-useragent";
import { errorHandler, notFound } from "./middlewares/handlers";

// INIT
const app = express();
// SETTINGS
app.set("port", config.port);
app.set("trus proxy", true);
// MIDDLEWARES
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(useragent.express());
app.use(passport.initialize());
// passport.use(passportMiddleware);
// ROUTES
app.get("/", async (req: Request, res: Response) => {
	const users = await config.prisma.user.findMany({
		include: {
			role: true
		}
	});
	res.status(200).json({
		status: 200,
		message: "👺 ✌🏼 🥷🏼 App is running!",
		users
	});
});
// -- Open Routes
// app.use("/", GetUrl);
// -- Auth Routes
// app.use("/auth", Auth);
// -- Api Routes
// ---- protected routes
// app.use("/api/v1", passport.authenticate("jwt", { session: false }), ApiV1);
// -- Error & Not Found Handlers
app.use(notFound);
app.use(errorHandler);
// CRON JOB
// cron.schedule("0 3 * * *", cronController); // Cron to delete black tokens every 3am in the morning

export default app;
