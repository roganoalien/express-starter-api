import { Router } from "express";
import passport from "passport";
import { createSuperAdmin, superAdmin } from "../controllers/auth";
// ROUTER Definition
const router: Router = Router();
// ---- Validates if you can create a superAdmin
router.get("/local", superAdmin);
// ---- Creates superAdmin
router.post("/local/registerSuper", createSuperAdmin);

export default router;
