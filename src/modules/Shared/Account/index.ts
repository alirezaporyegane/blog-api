import { Router } from 'express'

const router = Router()

// Routes
import AccountRoutes from './Routes/account.routes'

// Shared Account
router.use('/shared/account', AccountRoutes)

export default router
