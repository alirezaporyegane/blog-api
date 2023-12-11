import { Router } from 'express'

const router = Router()

import UsersRoutes from './Routes/users.routes'

// Admin
router.use('/admin/users', UsersRoutes)

export default router
