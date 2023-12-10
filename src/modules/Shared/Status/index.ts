import { Router } from 'express'

const router = Router()

// Routes
import StatusRoute from './Router/status.router'

// Shared Status
router.use('/server-status', StatusRoute)

export default router
