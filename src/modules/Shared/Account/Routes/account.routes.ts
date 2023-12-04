import { Router } from 'express'
import { authorization } from '../../../../middleware/Auth'
import {
  getUserProfile,
  login,
  logout,
  register,
  updateUserProfile
} from '../Controller/account.controller'
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
router.post('/logout', authorization, logout)

/**
 * GET USER PROFILE
 * @method (GET) /api/shared/account/my
 */
router.get('/my', authorization, getUserProfile)

/**
 * GET USER PROFILE
 * @method (PUT) /api/shared/account/my
 */
router.put('/my', authorization, updateUserProfile)

export default router
