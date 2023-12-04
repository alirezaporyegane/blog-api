import { Router } from 'express'

const router = Router()

import AdminPostCategory from './Routes/Admin/postCategory.routes'

// Admin
router.use('/admin/post-categories', AdminPostCategory)

export default router
