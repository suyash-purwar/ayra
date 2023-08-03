import { Router } from "express";
import webhookRouter from "./webhook.route.js";
import adminRouter from "./admin.route.js";

const router = Router();

router.use("/webhook", webhookRouter);
router.use("/admin", adminRouter);

export default router;
