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
import {
  IAccountLoginDto,
  IAccountProfile,
  IAccountRefreshTokenDto,
  IAccountRegisterDto
} from '../Dto/account.dto'
import { IAccountLoginEntity, IAccountRegister, Role, Status } from '../Entity/account.entity'
import accountModel from '../Model/account.model'
import {
  loginValidator,
  registerValidator,
  updateProfileValidator
} from '../Validator/account.validator'

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
        ...statusCodes.account.USER_WITH_THIS_PHONE_NUMBER_ALREADY_EXIST
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
      password: hashPassword,
      role: Role.USER,
      status: Status.NOT_ACTIVE
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
    const body: IAccountLoginEntity = pick(req.body, ['phoneNumber', 'password', 'uniqueId'])

    const { error } = loginValidator(body)
    if (error) return errorStatus400(res, error)

    const account = await accountModel.findOne({
      phoneNumber: body.phoneNumber
    })

    if (!account)
      return errorStatus401(res, {
        ...statusCodes.account.USER_NOT_FOUND
      })

    if (account.suspended)
      return errorStatus401(res, {
        ...statusCodes.account.USER_IS_SUSPENDED
      })

    const match = await compare(body.password, account.password)
    if (!match)
      return errorStatus401(res, {
        ...statusCodes.account.PASSWORD_IS_WRONG
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

/**
 * LOGOUT
 * @method (POST) /api/shared/account/logout
 */
export const logout = async (req: Request, res: Response) => {
  try {
    // await SessionsModel.deleteOne({ uniqueId: req.user.uniqueId })

    res.status(200).json('success')
  } catch (err) {
    errorStatus500(res, err)
  }
}

/**
 * REFRESH TOKEN
 * @method (POST) /api/shared/account/refresh-token
 */
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const account = await accountModel.findById(req!.user._id)

    if (!account)
      return errorStatus401(res, {
        ...statusCodes.account.USER_NOT_FOUND
      })

    const response: IAccountRefreshTokenDto = {
      token: account.generateRefreshToken(),
      ttl: 60 * 60 * 128
    }

    res.status(200).json(response)
  } catch (err) {
    errorStatus500(res, err)
  }
}

/**
 * GET USER
 * @method (GET) /api/shared/account/my
 */
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const account = await accountModel.findById(req!.user._id)

    if (!account)
      return errorStatus401(res, {
        ...statusCodes.account.USER_NOT_FOUND
      })

    const response: IAccountProfile = pick(account, [
      '_id',
      'firstName',
      'lastName',
      'email',
      'phoneNumber',
      'legality',
      'image',
      'confirmEmail',
      'confirmPhoneNumber',
      'confirmedProfile',
      'birthDate',
      'job',
      'nationalId',
      'gender'
    ])

    res.status(200).json(response)
  } catch (err) {
    errorStatus500(res, err)
  }
}

/**
 * UPDATE USER
 * @method (PUT) /api/shared/account/my
 */
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const body: IAccountProfile = pick(req.body, [
      'firstName',
      'lastName',
      'email',
      'phoneNumber',
      'legality',
      'image',
      'confirmEmail',
      'confirmPhoneNumber',
      'confirmedProfile',
      'birthDate',
      'job',
      'nationalId',
      'gender',
    ])

    const { error } = updateProfileValidator(body)
    if (error) return errorStatus400(res, error)

    await accountModel.findByIdAndUpdate(req.user._id, body)

    res.status(200).json(body)
  } catch (err) {
    errorStatus500(res, err)
  }
}
