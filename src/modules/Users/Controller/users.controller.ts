import { Request, Response } from 'express'
import mongoose, {ObjectId, Types} from 'mongoose'
import { errorStatus500 } from '../../../middleware/ErrorMessage'
import { Filters, Query } from '../Dto/getAll.dto.in'

/**
 * GET ALL MODEL
 * @method (GET) /api/admin/users
 */
export const getAll = (req: Request<{}, {}, {}, Query>, res: Response) => {
  try {
    const skip = req.query.skip ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    const Sort = req.query.sort ? eval(`({${req.query.sort}})`) : ''

    let filter: Filters
    if (req.query.id && mongoose.isValidObjectId(req.query.id))
      filter._id = req.query.id
      if (req.query.userName) filter.userName = { $regex: req.query.userName }
  } catch (err) {
    errorStatus500(res, err)
  }
}
