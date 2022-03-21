import { Request, Response } from "express";

export const handler = (req: Request, res: Response) => {
	res.status(200).json({
		message: `Should redirect to ${req.params.url}! 🛩`,
		status: 200,
		version: "0.0.1"
	});
};
