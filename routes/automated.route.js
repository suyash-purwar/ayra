import { Router } from 'express';
import * as automatedController from '../controllers/automated.controller.js';

const router = Router();

router.post('/first-hello', automatedController.firstHello);
router.get('/publish-result', automatedController.publishResult);

export default router;