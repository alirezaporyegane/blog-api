import { Router } from 'express'
import { create, remove } from '../Controller/file.controller'
import { upload } from '../../../../middleware/Upload'

const router = Router()

// FILES ROUTS

/**
 * CREATE
 * @method (POST) /api/shared/files
 */
router.post('/', upload.array('image', 20), create)

/**
 * DELETE BY FILE NAME
 * @method (DELETE) /api/shared/files
 */
router.delete('/', remove)

export default router
