import { Router } from 'express'
import { authorization, roleChecker } from '../../../../middleware/Auth'
import { Role } from '../../../Shared/Account/Entity/account.entity'
import {
  create,
  getAll,
  getById,
  remove,
  update,
  upsert
} from '../../Controller/Admin/postCategory.controller'

const router = Router()

router.use([authorization, roleChecker([Role.ADMIN, Role.WRITER])])

/**
 * GET ALL
 * @method (GET) /api/admin/post-categories
 */
router.get('/', getAll)

/**
 * GET MODEL BY ID
 * @method (GET) /api/admin/post-categories/:id
 */
router.get('/:id', getById)

/**
 * CREATE MODEL
 * @method (POST) /api/admin/post-categories
 */
router.post('/', create)

/**
 * CREATE, UPDATE AND DELETE MODEL
 * @method (PATCH) /api/admin/post-categories
 */
router.patch('/', upsert)

/**
 * UPDATE MODEL BY ID
 * @method (PUT) /api/admin/post-categories/:id
 */
router.put('/:id', update)

/**
 * DELETE MODEL BY ID
 * @method (DELETE) /api/admin/post-categories/:id
 */
router.delete('/:id', remove)

export default router
