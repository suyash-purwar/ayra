import { Router } from 'express';
import adminRouter from '../routes/admin.route.js';

const router = Router();

router.use('/admin', adminRouter);

export default router;
