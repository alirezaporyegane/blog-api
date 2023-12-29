import { Router } from 'express'
import { create, remove } from '../Controller/file.controller'
import { upload } from '../../../../middleware/Upload'

const router = Router()

// FILES ROUTS

/**
 * CREATE
 * @method (GET) /api/shared/files
 */
router.post('/', upload.array('image', 20), create)

/**
 * DELETE BY FILE NAME
 * @method (DELETE) /api/shared/files/:filename
 */
router.delete('/:filename', remove)

export default router
