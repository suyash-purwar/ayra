import { Router } from 'express';
import { admin, publishResult, postUMC } from './../controllers/admin.controller.js';

const router = Router();

router.get('/', admin);
router.post('/publish-result', publishResult);
router.post('/post-umc', postUMC);

export default router;
