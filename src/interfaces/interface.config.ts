import { PrismaClient } from "@prisma/client";

export default interface ConfigObjecgt {
	db: {
		uri: string;
	};
	environtment: string;
	jwt: {
		secret: string;
	};
	port: number;
	prisma: PrismaClient;
	sendgrid: {
		api: string;
		email: string;
		using: boolean;
	};
	url: string;
}
