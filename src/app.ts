import express, { Request, RequestHandler, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import featurePolicy from "feature-policy";
import cron from "node-cron";
import passport from "passport";
import passportMiddleware from "./middlewares/passport";
// CONFIG
import { config } from "./config";
import { cronController } from "./controllers/controller.cron";
// ROUTES
// import GetUrl from "./api/api.url";
import Auth from "./api/api.auth";
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
app.use(helmet());
app.use(
	helmet.contentSecurityPolicy({
		useDefaults: false,
		directives: {
			defaultSrc: ["'self'"],
			scriptSrc: ["'self'", "'unsafe-inline'"],
			// styleSrc: ["'self'", "fonts.googleapis.com"],
			styleSrc: ["'self'"],
			// fontSrc: ["'self'", "fonts.gstatic.com"],
			fontSrc: ["'self'"],
			// connectSrc: ["'self'", "wss://video.geekwisdom.net"],
			connectSrc: ["'self'"]
		}
	})
);
app.use(helmet.dnsPrefetchControl({ allow: false }));
app.use(helmet.frameguard({ action: "deny" }));
app.use(helmet.hidePoweredBy());
const sixtyDaysInSeconds = 5184000; // 60 * 24 * 60 * 60
app.use(
	helmet.hsts({
		maxAge: sixtyDaysInSeconds
	})
);
app.use(helmet.xssFilter());
app.use(
	featurePolicy({
		features: {
			accelerometer: ["'none'"],
			ambientLightSensor: ["'none'"],
			autoplay: ["'none'"],
			camera: ["'none'"],
			encryptedMedia: ["'self'"],
			fullscreen: ["'none'"],
			geolocation: ["'self'"],
			gyroscope: ["'none'"],
			vibrate: ["'none'"],
			payment: ["stripe.com"],
			syncXhr: ["'none'"]
		}
	})
);
const whitelist = ["http://localhost:3000", "http://localhost:4000"];
app.use(
	cors({
		origin: whitelist,
		methods: "GET,PUT,POST,DELETE",
		preflightContinue: false,
		optionsSuccessStatus: 206
	})
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(useragent.express());
app.use(passport.initialize());
passport.use(passportMiddleware);
// ROUTES
app.get("/", async (req: Request, res: Response) => {
	// ---- Validates if a superAdmin has been created
	const users = await config.prisma.user.findMany({
		where: {
			is_super_admin: true
		}
	});
	res.status(200).json({
		status: 200,
		message: "👺 ✌🏼 🥷🏼 App is running!",
		super_admin: {
			can_create: users.length > 0 ? false : true
		}
	});
});
// -- Open Routes
app.use("/auth", Auth);
// -- Auth Routes
// app.use("/auth", Auth);
// -- Api Routes
// ---- protected routes
// app.use("/api/v1", passport.authenticate("jwt", { session: false }), ApiV1);
// -- Error & Not Found Handlers
app.use(notFound);
app.use(errorHandler);
// CRON JOB
cron.schedule("0 3 * * *", cronController); // Cron to delete black tokens every 3am in the morning

export default app;
