import { Router } from 'express'
import { login, logout, register } from '../Controller/account.controller'
import { authorization } from '../../../../middleware/Auth'
const router = Router()

/**
 * REGISTER
 * @method (POST) /api/shared/account/register
 */
router.post('/register', register)

/**
 * REGISTER
 * @method (POST) /api/shared/account/login
 */
router.post('/login', login)

/**
 * LOGOUT
 * @method (POST) /api/shared/account/logout
 */
router.post('/login', authorization, logout)

export default router
