import { compare, hash } from 'bcrypt'
import { Request, Response } from 'express'
import { pick } from 'lodash'
import {
  errorStatus400,
  errorStatus401,
  errorStatus409,
  errorStatus500
} from '../../../../middleware/ErrorMessage'
import statusCodes from '../../../../middleware/StatusCodes'
import { IAccountLoginDto, IAccountRegisterDto } from '../Dto/account.dto'
import { IAccountLoginEntity, IAccountRegister } from '../Entity/account.entity'
import accountModel from '../Model/account.model'
import { loginValidator, registerValidator } from '../Validator/account.validator'

/**
 * ACCOUNT CONTROLLER
 */

/**
 * REGISTER
 * @method (POST) /api/shared/account/register
 */
export const register = async (req: Request, res: Response) => {
  try {
    const body: IAccountRegister = pick(req.body, [
      'phoneNumber',
      'password',
      'firstName',
      'lastName',
      'userName',
      'email',
      'uniqueId',
      'confirmPassword'
    ])

    const { error } = registerValidator(body)
    if (error) return errorStatus400(res, error)

    const isAccountExist = await accountModel.exists({
      phoneNumber: body.phoneNumber
    })

    if (isAccountExist)
      return errorStatus409(res, {
        data: statusCodes.account.USER_WITH_THIS_PHONE_NUMBER_ALREADY_EXIST.text,
        statusCode: statusCodes.account.USER_WITH_THIS_PHONE_NUMBER_ALREADY_EXIST.code
      })

    const hashPassword = await hash(body.password, 12)

    const newAccountBody = {
      ...pick(req.body, [
        'phoneNumber',
        'userType',
        'firstName',
        'lastName',
        'userName',
        'email',
        'uniqueId'
      ]),
      password: hashPassword
    }

    const newAccount = await accountModel.create(newAccountBody)

    const generatedToken = newAccount.generateToken()
    const generatedRefreshToken = newAccount.generateRefreshToken()

    const accountDto: IAccountRegisterDto = {
      ...pick(newAccount, [
        '_id',
        'userName',
        'phoneNumber',
        'email',
        'role',
        'firstName',
        'lastName'
      ]),
      token: generatedToken,
      refreshToken: generatedRefreshToken,
      ttl: 60 * 60 * 48,
      refreshTtl: 60 * 60 * 128
    }

    res.status(200).json(accountDto)
  } catch (err) {
    errorStatus500(res, err)
  }
}

/**
 * REGISTER
 * @method (POST) /api/shared/account/login
 */
export const login = async (req: Request, res: Response) => {
  try {
    const body: IAccountLoginEntity = pick(req.body, [
      'phoneNumber',
      'password',
      'uniqueId'
    ])

    const { error } = loginValidator(body)
    if (error) return errorStatus400(res, error)

    const account = await accountModel.findOne({
      phoneNumber: body.phoneNumber
    })

    if (!account)
      return errorStatus401(res, {
        data: statusCodes.account.USER_NOT_FOUND.text,
        statusCode: statusCodes.account.USER_NOT_FOUND.code
      })

    if (account.suspended)
      return errorStatus401(res, {
        data: statusCodes.account.USER_IS_SUSPENDED.text,
        statusCode: statusCodes.account.USER_IS_SUSPENDED.code
      })

    const match = await compare(body.password, account.password)
    if (!match)
      return errorStatus401(res, {
        data: statusCodes.account.PASSWORD_IS_WRONG.text,
        statusCode: statusCodes.account.PASSWORD_IS_WRONG.code
      })

    account.uniqueId = body.uniqueId
    await account.save()

    const generatedToken = account.generateToken()
    const generatedRefreshToken = account.generateRefreshToken()

    const accountDto: IAccountLoginDto = {
      ...pick(account, [
        '_id',
        'userName',
        'firstName',
        'lastName',
        'phoneNumber',
        'email',
        'role'
      ]),
      token: generatedToken,
      refreshToken: generatedRefreshToken,
      ttl: 60 * 60 * 48,
      refreshTtl: 60 * 60 * 128
    }

    res.status(200).json(accountDto)
  } catch (err) {
    errorStatus500(res, err)
  }
}
