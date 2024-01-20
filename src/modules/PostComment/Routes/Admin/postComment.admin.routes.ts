import { Router } from 'express'
import { authorization, roleChecker } from '../../../../middleware/Auth'
import { Role } from '../../../Shared/Account/Entity/account.entity'
import {
  getAll,
  getById,
  getCount,
  update
} from '../../Controller/Admin/postComment.admin.controller'

const router = Router()

router.use([authorization, roleChecker([Role.ADMIN, Role.WRITER])])

/**
 * GET ALL MODEL
 * @method (GET) /api/admin/post-comments
 */
router.get('/', getAll)

/**
 * GET MODEL COUNT
 * @method (GET) /api/admin/post-comments/count
 */
router.get('/count', getCount)

/**
 * GET MODEL BY Id
 * @method (GET) /api/admin/post-comments/:id
 */
router.get('/:id', getById)

/**
 * UPDATE MODEL BY Id
 * @method (PUT) /api/admin/post-comments/:id
 */
router.put('/:id', update)

export default router
