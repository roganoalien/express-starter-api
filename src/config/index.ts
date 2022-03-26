import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import ConfigObject from "../interfaces/interface.config";

dotenv.config();

export const config: ConfigObject = {
	db: {
		uri: `${process.env.DATABASE_URL}`
	},
	environtment: process.env.NODE_ENV || "dev",
	jwt: {
		secret: process.env.JWT_SECRET || "randomstringforsecret"
	},
	port: (process.env.PORT as unknown as number) || 4000,
	prisma: new PrismaClient(),
	sendgrid: {
		api: process.env.SENDGRID_API || "null-string",
		email: process.env.SENDGRID_EMAIL || "test@test.com",
		using: process.env.USING_SENDGRID as unknown as boolean
	},
	url:
		process.env.NODE_ENV === "dev"
			? (process.env.DEV_URL as unknown as string)
			: (process.env.PROD_URL as unknown as string)
};
