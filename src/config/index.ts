import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import ConfigObject from "../interfaces/interface.config";

dotenv.config();

export const config: ConfigObject = {
	environtment: process.env.NODE_ENV || "dev",
	port: (process.env.PORT as unknown as number) || 4000,
	db: {
		uri: `${process.env.DATABASE_URL}`
	},
	prisma: new PrismaClient(),
	jwt: {
		secret: process.env.JWT_SECRET || "randomstringforsecret"
	}
};
