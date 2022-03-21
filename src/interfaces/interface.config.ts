export default interface ConfigObjecgt {
	environtment: string;
	port: number;
	db: {
		uri: string;
		user: string;
		password: string;
	};
	jwt: {
		secret: string;
	};
}
