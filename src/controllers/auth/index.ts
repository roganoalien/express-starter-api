import { User } from "@prisma/client";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../../config";

/**
 * Create token
 * @constructor
 * @param {object} user - receives User
 * @returns jsonwebtoken
 */
function createToken(user: User, longer: boolean = false) {
	return jwt.sign({ id: user.id, email: user.email }, config.jwt.secret, {
		expiresIn: longer ? 604800 : 86400 // a week or 24 hours
	});
}
/**
 * Validates Token
 * @constructor
 * @param {string} token - receives token to validate
 * @returns boolean
 */
function validateToken(token: string) {
	return jwt.verify(token, config.jwt.secret);
}

/**
 * Validates if you can create superAdmin
 */
export const superAdmin = async (req: Request, res: Response): Promise<Response> => {
	const user = await config.prisma.user.findMany({
		where: {
			is_super_admin: true
		}
	});

	if (user.length < 1) {
		return res.status(200).json({
			status: 200,
			super_admin: {
				can_create: true,
				message: "You can create superAdmin! 👺 🥷🏼"
			}
		});
	} else {
		const error = new Error("🙉 🙈 🙊 - 🚨 Forbidden!");
		return res.status(403).json({
			status: 403,
			type: error.name,
			message: error.message
		});
	}
};
/**
 * Validates if you can create superAdmin
 */
export const createSuperAdmin = async (req: Request, res: Response): Promise<Response> => {
	const { email, password } = req.body;
	const users = await config.prisma.user.create({
		data: {
			confirmed: true,
			email,
			password,
			permission: "ADMIN",
			is_super_admin: true
		}
	});
	return res.status(200).json({
		status: 200,
		message: "Creado"
	});
};
