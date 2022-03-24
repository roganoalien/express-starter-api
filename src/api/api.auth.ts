import { Router } from "express";
import {
	codeVerification,
	createSuperAdmin,
	loginUser,
	registerUser,
	superAdmin,
	tokenValidation,
	userLogout
} from "../controllers/auth";
// ROUTER Definition
const router: Router = Router();
// ---- Validates if you can create a superAdmin
router.get("/local", superAdmin);
// ---- Login User
router.post("/local/login", loginUser);
// ---- Creates superAdmin
router.post("/local/registerSuper", createSuperAdmin);
// ---- Creates regular user
router.post("/local/register", registerUser);
// ---- Confirm User
router.post("/local/codeVerification", codeVerification);
// ---- Token Validation
router.post("/local/token", tokenValidation);
// ---- User Logout
router.post("/local/logout", userLogout);

export default router;
