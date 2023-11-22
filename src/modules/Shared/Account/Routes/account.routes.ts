import { Request, Response, Router } from 'express'
import { login, register } from '../Controller/account.controller'
const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'hello world'
  })
})

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

export default router
