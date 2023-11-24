import jwt from 'jsonwebtoken'
import config from 'config'
import { NextFunction, Request, Response } from 'express'
import { errorStatus401, errorStatus500 } from './ErrorMessage'
import statusCodes from './StatusCodes'
import { IData } from '../modules/Shared/Account/Entity/account.entity'
import accountModel from '../modules/Shared/Account/Model/account.model'

export interface UserRequest extends Request {
  user: IData
}

export const authorization = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.slice(7)
    const bearer = req.header('Authorization')?.slice(0, 6)

    if (bearer !== 'Bearer')
      return errorStatus401(res, { ...statusCodes.account.TOKEN_IS_NOT_VALID })
    if (!token) return errorStatus401(res, { ...statusCodes.account.TOKEN_IS_REQUIRED })

    const user = jwt.verify(token, config.get('SECRET_KEY')) as IData
    req.user = user

    const account = await accountModel.findOne({ _id: user._id })

    if (!account) return errorStatus401(res, { ...statusCodes.account.USER_NOT_FOUNT })
    if (account.suspended) return errorStatus401(res, { ...statusCodes.account.USER_IS_SUSPENDED })

    if (user.confirmPhoneNumber)
      return errorStatus401(res, { ...statusCodes.account.YOUR_PHONE_NUMBER_IS_NOT_CONFIRM })

    next()
  } catch (err) {
    errorStatus401(res, { ...statusCodes.account.TOKEN_IS_EXPIRED })
  }
}

export const roleChecker = (roles: string[]) => {
  return async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
      if (typeof roles === 'string') roles = [roles]
      const hasRole = req.user.role && !!req.user.role.find((o: string) => roles.includes(o))

      if (!hasRole)
        return errorStatus401(res, { ...statusCodes.account.USER_NOT_HAVE_CURRENT_ROLE })

      next()
    } catch (err: unknown) {
      errorStatus500(res, err)
    }
  }
}
