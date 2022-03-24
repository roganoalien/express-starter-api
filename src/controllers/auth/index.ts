import { User } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "../../config";
import { add, compareAsc } from "date-fns";

/**
 * Create random 6 digits number
 * @constructor
 * @returns int
 */
function createCode(): number {
	const min = 100000;
	const max = 999999;
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
			expiration_code: add(new Date(), { hours: 1 }),
			name: name ? name : null,
			password: hashedPassword,
			permission: "ADMIN",
			is_super_admin: true
		}
	});
	return res.status(200).json({
		status: 200,
		message: "Super Admin Created! 👺 🥷🏼 👨🏼‍💼",
		user: {
			id: user.id,
			name: user.name,
			email: user.email
		}
	});
};

/**
 * Registers regular user
 */
export const registerUser = async (req: Request, res: Response): Promise<Response> => {
	const { email, password, name, permission } = req.body;
	const userStatus = await config.prisma.user.findUnique({ where: { email } });
	if (!userStatus) {
		const confirmation_code = createCode();
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const user = await config.prisma.user.create({
			data: {
				email,
				expiration_code: add(new Date(), { hours: 1 }),
				name: name ? name : null,
				password: hashedPassword,
				permission,
				is_super_admin: false,
				confirmation_code
			}
		});
		return res.status(200).json({
			status: 200,
			message: `User Created! ${permission === "ADMIN" ? "👨🏼‍💼 👱‍♂️" : "👱‍♂️"}`,
			confirmation_code,
			user: {
				email: user.email,
				id: user.id
			}
		});
	}
	return res.status(409).json({
		status: 409,
		message: `Wrong data! Please try again. 🥷🏼 🎟`
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

/**
 * Validates token
 */
export const tokenValidation = async (
	req: Request,
	res: Response
): Promise<boolean | Error> => {
	const { token } = req.body;
	const blackToken = await config.prisma.blackToken.findUnique({ where: { token } });
	if (!blackToken) {
		if (validateToken(token)) {
			return true;
			// return res.status(200).json({ status: 200, message: "Valid token! 🙆🏼‍♂️ ✔✔" });
		} else {
			return new Error("Invalid or expired token! 👮🏼‍♀️ 🚨 🛑 ✋🏼");
			// return res
			// 	.status(401)
			// 	.json({ status: 401, message: "Invalid or expired token! 👮🏼‍♀️ 🚨 🛑 ✋🏼" });
		}
	}
	return new Error("Invalid or expired token! 👮🏼‍♀️ 🚨 🛑 ✋🏼");
	// return res
	// 	.status(401)
	// 	.json({ status: 401, message: "Invalid or expired token! 👮🏼‍♀️ 🚨 🛑 ✋🏼" });
};

/**
 * Verify User Code
 */
export const codeVerification = async (req: Request, res: Response): Promise<Response> => {
	const { id, confirmation_code } = req.body;
	const today = new Date();
	const isUser = await config.prisma.user.findUnique({ where: { id } });
	console.log(isUser);
	if (isUser) {
		console.log("EXISTE USUARIO");
		if (
			confirmation_code === isUser.confirmation_code &&
			compareAsc(new Date(isUser.expiration_code), today) > 0
		) {
			await config.prisma.user.update({
				where: { id },
				data: {
					confirmed: true
				}
			});
			return res.status(200).json({
				status: 200,
				message: "User confirmed! 🥷🏼 ✌🏼"
			});
		} else {
			return res.status(409).json({
				status: 409,
				message: "Invalid request! ✋🏼 👮🏼‍♂️ 🚨"
			});
		}
	}
	return res.status(409).json({
		status: 409,
		message: "Invalid request! ✋🏼 👮🏼‍♂️ 🚨"
	});
};

/**
 * User Logout, invalidates the token
 */
export const userLogout = async (req: Request, res: Response): Promise<Response> => {
	const { token } = req.body;
	const blackToken = await config.prisma.blackToken.findUnique({ where: { token } });
	if (!blackToken) {
		await config.prisma.blackToken.create({
			data: {
				token
			}
		});
		return res.status(200).json({
			status: 200,
			message: "Sayoonara! 👋🏼 ✌🏼"
		});
	}
	return res.status(403).json({
		status: 403,
		message: "You've already logged out! 🙉 🙊 🙈 🥷🏼"
	});
};
