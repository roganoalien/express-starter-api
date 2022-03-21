import { NextFunction, Request, Response } from "express";
import { config } from "../config";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
	res.status(404);
	const error = new Error(`🙈 🙉 🙊 - Not Found - ${req.originalUrl}`);
	next(error);
};

export const errorHandler = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
	res.status(statusCode).json({
		status: statusCode,
		message: error.message,
		complement: config.environtment === "production" ? "🙈 🙉 🙊" : error.stack
	});
};
