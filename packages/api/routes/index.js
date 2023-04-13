import { Router } from 'express';
import webhookRouter from './webhook.route.js';

const router = Router();

router.use('/webhook', webhookRouter);

export default router;