import { Router } from 'express'

const router = Router()

// Routes
import StatusRoute from './Router/status.router'

// Shared Status
router.use('/shared/server-status', StatusRoute)

export default router
