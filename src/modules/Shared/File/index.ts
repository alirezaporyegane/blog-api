import { Router } from 'express'

const router = Router()

// Routes
import FileRoutes from './Routes/file.routes'

// Shared Account
router.use('/shared/files', FileRoutes)

export default router
