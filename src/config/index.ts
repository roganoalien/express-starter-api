import dotenv from "dotenv";
import ConfigObject from "../interfaces/interface.config";

dotenv.config();

export const config: ConfigObject = {
	environtment: process.env.NODE_ENV || "dev",
	port: (process.env.PORT as unknown as number) || 4000,
	db: {
		uri: `${process.env.DB_URI}/${process.env.DB_NAME}`,
		user: process.env.DB_USER || "default",
		password: process.env.DB_PASSWORD || "default"
	},
	jwt: {
		secret: process.env.JWT_SECRET || "randomstringforsecret"
	}
};
