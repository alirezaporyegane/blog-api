import { Router } from 'express'
import { authorization } from '../../../../middleware/Auth'
import {
  create,
  getAll,
  getById,
  getCount,
  like,
  update
} from '../../Controller/Public/postComment.public.controller'

const router = Router()

router.use([authorization])

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
 * CREATE MODEL
 * @method (POST) /api/admin/post-comments
 */
router.post('/', create)

/**
 * UPDATE MODEL BY Id
 * @method (PUT) /api/admin/post-comments/:id
 */
router.put('/:id', update)

/**
 * LIKE MODEL
 * @method (PUT) /api/public/post-comments/:id/like
 */
router.put('/:id/like', like)

export default router
