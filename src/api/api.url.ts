import { Router } from "express";
import { handler } from "../controllers/controller.url";
// ROUTER definition
const router: Router = Router();

router.post("/", handler);

export default router;
