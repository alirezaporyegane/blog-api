import { Router } from 'express'
import { authorization, roleChecker } from '../../../middleware/Auth'
import { Role } from '../../Shared/Account/Entity/account.entity'
import { create, getAll, getById, getCount, remove, update } from '../Controller/users.controller'

const router = Router()

router.use([authorization, roleChecker([Role.ADMIN, Role.WRITER])])

/**
 * GET ALL MODEL
 * @method (GET) /api/admin/users
 */
router.get('/', getAll)

/**
 * GET MODEL COUNT
 * @method (GET) /api/admin/users/count
 */
router.get('/count', getCount)

/**
 * GET MODEL BY ID
 * @method (GET) /api/admin/users/:id
 */
router.get('/:id', getById)

/**
 * CREATE MODEL
 * @method (POST) /api/admin/users
 */
router.post('/', create)

/**
 * UPDATE MODEL BY ID
 * @method (PUT) /api/admin/users/:id
 */
router.put('/:id', update)

/**
 * DELETE MODEL BY ID
 * @method (DELETE) /api/admin/users/:id
 */
router.delete('/:id', remove)

export default router
