import { Router } from 'express'
import { getServerStatus } from '../Controller/status.controller'
const router = Router()

/**
 * GET SERVER STATUS
 * @method (GET) /api/shared/server-status
 */
router.get('/', getServerStatus)

export default router
