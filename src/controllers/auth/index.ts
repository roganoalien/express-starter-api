import { User } from "@prisma/client";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
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
	const { email, password, name } = req.body;
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	const user = await config.prisma.user.create({
		data: {
			confirmed: true,
			email,
			name: name ? name : null,
			password: hashedPassword,
			permission: "ADMIN",
			is_super_admin: true
		}
	});
	return res.status(200).json({
		status: 200,
		message: "Creado",
		user: {
			id: user.id,
			name: user.name,
			email: user.email
		}
	});
};

/**
 * Logins user
 */
export const loginUser = async (req: Request, res: Response): Promise<Response> => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({
			message: "Email and password are required!"
		});
	}
	const user: any = await config.prisma.user.findUnique({ where: { email } });
	if (!user) {
		return res.status(400).json({
			status: 400,
			message: "Email or password incorrect! 🛑 🙉 🤦🏼‍♂️ "
		});
	}
	const matched = await bcrypt.compare(password, user?.password);
	if (user && matched) {
		return res.status(200).json({
			status: 200,
			message: "Inicio de sesión 📱",
			token: createToken(user, false)
		});
	}
	return res.status(400).json({
		status: 400,
		message: "Email or password incorrect! 🛑 🙉 🤦🏼‍♂️ "
	});
};
