import { Router } from 'express';
import { admin, publishResult } from './../controllers/admin.controller.js';

const router = Router();

router.get('/', admin);
router.post('/publish-result', publishResult);

export default router;
