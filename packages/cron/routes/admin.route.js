import { Router } from 'express';
import * as adminController from '../controllers/admin.controller.js';

const router = Router();

router.get('/', adminController.admin);
router.post('/publish-result', adminController.publishResult);
router.post('/post-umc', adminController.postUMC);
router.post('/first-hello', adminController.firstHello);
router.get('/publish-result', adminController.publishResult);

export default router;
