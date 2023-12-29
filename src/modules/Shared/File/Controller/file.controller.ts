import { Response, Request } from 'express'
import { errorStatus400, errorStatus500 } from '../../../../middleware/ErrorMessage'
import { CreateFileEntity } from '../Entity'
import FileModel from '../Model/file.model'
import { filesValidator } from '../Validator/file.validator'

// FILE CONTROLLER

/**
 * CREATE
 * @method (POST) /api/shared/files
 */
export const create = async (req: Request, res: Response) => {
  try {
    const filePath: CreateFileEntity = {
      images: []
    }

    if (req?.files?.length && Array.isArray(req.files)) {
      filePath.images = req.files.map((file: Express.Multer.File) => file.path.slice(7))
    }

    const { error } = filesValidator(filePath)
    if (error) return errorStatus400(res, error)

    const files = await FileModel.create(filePath)

    res.status(200).json(files.images)
  } catch (err) {
    errorStatus500(res, err)
  }
}

/**
 * DELETE BY FILE NAME
 * @method (DELETE) /api/shared/files/:filename
 */
export const remove = async (req: Request, res: Response) => {
  try {
    const filename = req.params.filename

    // fs.unlinkSync(`public/${filename}`)

    await FileModel.deleteOne({ images: filename })

    res.status(200).json('success')
  } catch (err) {
    errorStatus500(res, err)
  }
}
