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
}
