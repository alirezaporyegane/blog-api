import { Request, Response } from 'express'
import { errorStatus500 } from '../../../../middleware/ErrorMessage'


/**
 * GET SERVER STATUS
 * @method (GET) /api/shared/server-status
 */
export const getServerStatus = (req: Request, res: Response) => {
  try {
    res.status(200).json('success')
  } catch (err: unknown) {
    errorStatus500(res, err)
  }
}
