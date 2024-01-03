import { Router } from 'express'
import { authorization, roleChecker } from '../../../middleware/Auth'
import { Role } from '../../Shared/Account/Entity/account.entity'
import { create, getAll, getById, getCount, remove, update } from '../Controller/post.controller'

const router = Router()

router.use([authorization, roleChecker([Role.ADMIN, Role.WRITER])])

/**
 * GET ALL MODEL
 * @method (GET) /api/admin/posts
 */
router.get('/', getAll)

/**
 * GET MODEL COUNT
 * @method (GET) /api/admin/posts/count
 */
router.get('/count', getCount)

/**
 * GET MODEL BY Id
 * @method (GET) /api/admin/posts/:id
 */
router.get('/:id', getById)

/**
 * CREATE MODEL
 * @method (POST) /api/admin/posts
 */
router.post('/', create)

/**
 * UPDATE MODEL BY ID
 * @method (PUT) /api/admin/posts/:id
 */
router.put('/:id', update)

/**
 * DELETE MODEL BY ID
 * @method (DELETE) /api/admin/posts/:id
 */
router.delete('/:id', remove)

export default router
