import { Router } from 'express'

const router = Router()

// Admin
import PostCommentsAdminRoutes from './Routes/Admin/postComment.admin.routes'

router.use('/admin/post-comments', PostCommentsAdminRoutes)

// PUBLIC
import PostCommentsPublicRoutes from './Routes/Public/postComment.Public.route'
router.use('/public/post-comments', PostCommentsPublicRoutes)

export default router
