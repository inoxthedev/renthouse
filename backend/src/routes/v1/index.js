import express from 'express'
import authRoutes from './authRoutes.js'


const router = express.Router();

router.use('/auth', authRoutes);

const APIs_V1 = router;
export default APIs_V1;