import express from 'express';

import pingRoutes from '../ping/ping.route.js'
import authRoutes from '../auth/auth.route.js'
import userRoute from "../user/user.route.js";
import cohortRoutes from "../cohort/cohort.routes.js";
import modulesRoutes from "../modules/modules.routes.js";


const router = express.Router()

router.use('/ping', pingRoutes)

router.use('/auth', authRoutes)

router.use('/user', userRoute)
router.use('/cohort', cohortRoutes)
router.use('/modules', modulesRoutes)


export default router;