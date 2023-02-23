import { Router } from 'express';
import * as webhookController from '../controllers/webhook.controller.js';

const router = Router();

router.get('/receive', webhookController.verifyWebhook);
router.post('/receive', webhookController.processMessage);

export default router;