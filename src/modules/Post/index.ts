import { Router } from 'express'

const router = Router()

import PostRoutes from './Routes/post.routes'

// Admin
router.use('/admin/posts', PostRoutes)

export default router
